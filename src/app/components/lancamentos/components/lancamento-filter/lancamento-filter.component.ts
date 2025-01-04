import {CommonModule, formatDate} from '@angular/common';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core'; // Ou MatMomentDateModule, se preferir usar Moment.js
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ApiService} from '../../../../services/api.service';
import {ContaOutput} from '../../../../shared/model/conta/conta.model';

interface Filter {
  categorias: string[],
  tipo: string,
  pagamento: string,
  status: string[],
  contasSelecionadas: ContaOutput[],
  dtInicio: string,
  dtFim: string
}

@Component({
    selector: 'app-lancamento-filter',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './lancamento-filter.component.html',
    styleUrl: './lancamento-filter.component.scss'
})
export class LancamentoFilterComponent implements OnInit {

  @Output() apply = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();

  constructor(private _api: ApiService) { }


  contaVazia = {
    id: 0,
    banco: '',
    nome: '',
    dtVencimento: '',
    dtFechamento: '',
    tipoConta: '',
    saldoParcial: 0,
    color: '',
  }

  categorias: Array<string> = [];
  contas: Array<any> = [];
  tiposLancamento = ['ENTRADA', 'SAIDA'];
  tiposPagamento = ['DEBITO', 'CREDITO'];
  statusLancamento = ['Em Aberto', 'Quitado', 'Cancelado'];
  filtros: Filter = {
    categorias: [''],
    tipo: '',
    pagamento: '',
    status: [''],
    contasSelecionadas: [
      this.contaVazia
    ],
    dtInicio: this.getInicioMesPassado(),
    dtFim: this.getFimMesPassado()
  }

  ngOnInit(): void {
    this.getContas();
    this.getCategorias();
    this.onApply();
  }

  onCriar() {
    this.create.emit(null);
  }

  onApply() {
    let contaIds = '';

    if (this.filtros.contasSelecionadas)
      contaIds = this.filtros.contasSelecionadas.filter(c => c && Number(c.id) !== 0).map(c => c.id).join(', ');


    const filters = {
      categoria: this.filtros.categorias.join(', '),
      tipo: this.filtros.tipo,
      pagamento: this.filtros.pagamento,
      status: this.filtros.status.map(s => s.normalize().toUpperCase().replace(' ', '_')).join(', '),
      contaIds: contaIds,
      dtInicio: formatDate(this.filtros.dtInicio, 'yyyy-MM-ddT00:00:00', 'en-US'),
      dtFim: formatDate(this.filtros.dtFim, 'yyyy-MM-ddT23:59:59', 'en-US')
    };

    this.apply.emit(filters);
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
}
