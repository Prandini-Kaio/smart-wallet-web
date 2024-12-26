import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LancamentoOutput, Totalizador, TransacaoOutput } from '../../shared/lancamento/model/lancamento.model';
import { LancamentoItemComponent } from '../lancamento-item/lancamento-item.component';
import { TransacaoItemComponent } from "../transacao-item/transacao-item.component";
import { TransacaoListComponent } from "../transacao-list/transacao-list.component";
import { LancamentoFilterComponent } from "../lancamento-filter/lancamento-filter.component";
import { app } from '../../../../server';
import { ContaOutput } from '../../shared/conta/conta.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lancamento-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LancamentoItemComponent,
    TransacaoListComponent,
    LancamentoFilterComponent
],
  templateUrl: './lancamento-list.component.html',
  styleUrl: './lancamento-list.component.scss'
})
export class LancamentoListComponent implements OnInit {

  showLancamentoList = false;

  toggle(show: boolean) {
    this.showLancamentoList = show;
  }

  transacoes: TransacaoOutput[] = [];
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
    dtFim: this.getFimMesPassado()
  };

  totalizador: Totalizador = {
    totalEntrada: 0,
    totalSaida: 0,
    total: 0
  };

  getInicioMesPassado(): string {
    const dataAtual = new Date();
    const mesPassado = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
    return mesPassado.toISOString().split('T')[0];
  }

  getFimMesPassado(): string {
    const dataAtual = new Date();
    const mesPassado = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 2, 0);
    return mesPassado.toISOString().split('T')[0];
  }
  
  constructor(
    private readonly _api: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {

    this.editForm = new FormGroup({
      conta: new FormControl({nome: '', banco: ''}, Validators.required),
      valor: new FormControl('', Validators.required),
      tipoLancamento: new FormControl('conta', Validators.required),
      tipoPagamento: new FormControl('conta', Validators.required),
      categoriaLancamento: new FormControl('conta', Validators.required),
      parcelas: new FormControl('conta', Validators.required),
      descricao: new FormControl('conta', Validators.required),
      dtCriacao: new FormControl('conta', Validators.required),
    })
  }


  ngOnInit(): void {
    this.loadData();
    this.getContas();
    this.getCategorias();
  }

  getContas() {
    this._api.getContas({}).subscribe((response) => {
      this.contas = response;
    }, (error) => {
      console.error(error);
    })
  }

  getCategorias() {
    this._api.getCategoria().subscribe((response) => {
      this.categorias = response;
    }, (error) => {
      console.error(error);
    })
  }

  loadData(): void {
    this._api.getTransacoes({}).subscribe(
      (data) => {
        this.transacoes = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Erro carregando lancamentos. Por favor tente novamente.';
        this.loading = false;
        console.error('Erro carregando lancamentos:', error);
      }
    );

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

    this._api.getTotalizadorTransacoes({}).subscribe(response => {
      this.totalizador = response;
    });
  }

  onCancel() {
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

    this.editForm = new FormGroup({
      id: new FormControl(lancamento.id),
      conta: new FormControl(lancamento.conta, Validators.required),
      valor: new FormControl(lancamento.valor, Validators.required),
      tipoLancamento: new FormControl(lancamento.tipoLancamento, Validators.required),
      tipoPagamento: new FormControl(lancamento.tipoPagamento, Validators.required),
      categoriaLancamento: new FormControl(lancamento.categoriaLancamento, Validators.required),
      parcelas: new FormControl(lancamento.parcelas, Validators.required),
      descricao: new FormControl(lancamento.descricao, Validators.required),
      dtCriacao: new FormControl(lancamento.dtCriacao, Validators.required),
    })

    this.showEditModalLancamento = true;
  }

  onEditSubmit() {
    if (this.editForm.valid){

      const dtCriacaoValue = new Date(this.editForm.get('dtCriacao')?.value);
      const currentDateTime = new Date();
      dtCriacaoValue.setHours(currentDateTime.getHours(), currentDateTime.getMinutes(), currentDateTime.getSeconds());

      const lancamento = this.lancamentos.find(l => l.id === this.editForm.get("id")?.value)

      const data = {
        id: lancamento?.id,
        conta: {
          nome: this.editForm.get('conta')?.value.nome,
          banco: this.editForm.get('conta')?.value.banco
        },
        valor: this.editForm.get('valor')?.value,
        tipoLancamento: this.editForm.get('tipoLancamento')?.value,
        tipoPagamento: this.editForm.get('tipoPagamento')?.value,
        categoriaLancamento: this.editForm.get('categoriaLancamento')?.value,
        parcelas: this.editForm.get('parcelas')?.value,
        descricao: this.editForm.get('descricao')?.value,
        dtCriacao: dtCriacaoValue.toISOString(), 
        status: lancamento?.status.toUpperCase().replaceAll(" ", "_"),

      };

      this._api.updateLancamento(data).subscribe((response) => {
        this.toastr.success('Lançamento atualizado com sucesso.', "Atualiado!");
      })
    }
  }

  closeEditModal() {
    this.showEditModalLancamento = false;
    this.showEditModalTransacao = false;
  }

  toggleExpand(lancamento: LancamentoOutput): void {
    lancamento.expanded = !lancamento.expanded;
  }

  editTransacao(transacao: TransacaoOutput): void {

  }

  deleteTransacao(obj: any): void {
    this.router.navigate(['lancamentos/add']);
  }

  deleteLancamento(lancamento: LancamentoOutput): void {

    const data = {
      id: lancamento.id
    }

    this._api.deleteLancamento(data).subscribe((data) => {
      this.toastr.success('Lançamento deletado com sucesso.', "Deletado!");
    });
    
    window.location.reload();
  }

  applyFilters(filters: any) {
    this._api.getTransacoes(filters).subscribe(
      (data) => {
        this.transacoes = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Erro carregando lancamentos. Por favor tente novamente.';
        this.loading = false;
        console.error('Erro carregando lancamentos:', error);
      }
    );

    this._api.getLancamento(filters).subscribe(
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

    this._api.getTotalizadorTransacoes(filters).subscribe(response => {
      this.totalizador = response;
    });
  }

}
