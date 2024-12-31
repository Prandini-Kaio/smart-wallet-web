import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { parse } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { ContaOutput } from '../../shared/conta/conta.model';
import {
  LancamentoOutput,
  Totalizador,
} from '../../shared/lancamento/model/lancamento.model';
import { LancamentoFilterComponent } from './components/lancamento-filter/lancamento-filter.component';
import { LancamentoItemComponent } from './components/lancamento-item/lancamento-item.component';
import { LancamentoServiceService } from '../add-lancamento/service/lancamento-service.service';
import { FormLancamentoComponent } from './components/form-lancamento/form-lancamento.component';

@Component({
  selector: 'app-lancamento-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LancamentoItemComponent,
    LancamentoFilterComponent,
    FormLancamentoComponent,
  ],
  templateUrl: './lancamento-list.component.html',
  styleUrl: './lancamento-list.component.scss',
})
export class LancamentoListComponent implements OnInit {
  showLancamentoList = false;

  toggle(show: boolean) {
    this.showLancamentoList = show;
  }

  lancamentos: LancamentoOutput[] = [];
  loading: boolean = true;
  error: string | null = null;

  editForm: FormGroup = new FormGroup({});
  editFormLancamento: FormGroup = new FormGroup({});
  editFormTransacao: FormGroup = new FormGroup({});

  showEditModalLancamento = false;
  showEditModalTransacao = false;

  categorias: Array<string> = [];
  contas: Array<ContaOutput> = [];
  tiposLancamento = ['ENTRADA', 'SAIDA'];
  tiposPagamento = ['DEBITO', 'CREDITO'];
  statusLancamento = ['Em Aberto', 'Quitado', 'Cancelado'];
  filtros = {
    categoria: '',
    tipoLancamento: '',
    tipoPagamento: '',
    conta: {},
    dtInicio: this.getInicioMesPassado(),
    dtFim: this.getFimMesPassado(),
  };

  totalizador: Totalizador = {
    totalEntrada: 0,
    totalSaida: 0,
    total: 0,
  };

  getInicioMesPassado(): string {
    const dataAtual = new Date();
    const mesPassado = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth(),
      1
    );
    return mesPassado.toISOString().split('T')[0];
  }

  getFimMesPassado(): string {
    const dataAtual = new Date();
    const mesPassado = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth() + 2,
      0
    );
    return mesPassado.toISOString().split('T')[0];
  }

  constructor(
    private readonly _api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private lancamentoService: LancamentoServiceService
  ) {
    this.editForm = new FormGroup({
      conta: new FormControl({ nome: '', banco: '' }, Validators.required),
      valor: new FormControl('', Validators.required),
      tipoLancamento: new FormControl('', Validators.required),
      tipoPagamento: new FormControl('', Validators.required),
      categoriaLancamento: new FormControl('', Validators.required),
      parcelas: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      dtCriacao: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.getContas();
    this.getCategorias();
  }

  getContas() {
    this._api.getContas({}).subscribe(
      (response) => {
        this.contas = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCategorias() {
    this._api.getCategoria().subscribe(
      (response) => {
        this.categorias = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadData(): void {
    this._api.getLancamento({}).subscribe(
      (data) => {
        this.lancamentos = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Erro carregando lancamentos. Por favor tente novamente.';
        this.loading = false;
        console.error('Erro carregando lancamentos:', error);
      }
    );

    this._api.getTotalizadorTransacoes({}).subscribe((response) => {
      this.totalizador = response;
    });
  }

  onCancel() {
    this.showEditModalLancamento = false;
    this.router.navigate(['lancamentos/view']);
  }

  viewDetails(id: string): void {
    this.router.navigate(['lancamentos/details', id]);
  }

  reloadPage() {
    window.location.reload();
  }

  createNew(): void {
    this.router.navigate(['lancamentos/add']);
  }

  editLancamento(lancamento: LancamentoOutput): void {
    this.lancamentoService.setLancamento(lancamento);
    this.showEditModalLancamento = true;
  }

  onEditSubmit(request: any) {
    this._api.updateLancamento(request).subscribe((response) => {
      this.toastr.success('Lançamento atualizado com sucesso.', 'Atualiado!');
    });
  }

  closeEditModal() {
    this.showEditModalLancamento = false;
    this.showEditModalTransacao = false;
  }

  toggleExpand(lancamento: LancamentoOutput): void {
    lancamento.expanded = !lancamento.expanded;
  }

  deleteLancamento(lancamento: LancamentoOutput): void {
    const data = {
      id: lancamento.id,
    };

    this._api.deleteLancamento(data).subscribe((data) => {
      this.toastr.success('Lançamento deletado com sucesso.', 'Deletado!');
    });

    window.location.reload();
  }

  copy(lancamento: LancamentoOutput): void {
    console.log(lancamento);
    this.lancamentoService.setLancamento(lancamento);
    this.router.navigate(['lancamentos/add']);
  }

  applyFilters(filters: any) {
    this._api.getLancamento(filters).subscribe((data) => {
      this.lancamentos = data;
      this.loading = false;
    });

    this._api.getTotalizadorTransacoes(filters).subscribe((response) => {
      this.totalizador = response;
    });
  }
}
