import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApiService} from "../../../../../../services/api.service";
import {CommonModule, formatDate} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ContaOutput} from "../../../../../../shared/model/conta/conta.model";
import { filter } from 'rxjs';

interface Filter {
  categorias: string[],
  tipo: string,
  pagamento: string,
  status: string[],
  contasSelecionadas: ContaOutput[],
  mes: string
}


@Component({
  selector: 'app-resumo-financeiro-filter',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './resumo-financeiro-filter.component.html',
  styleUrl: './resumo-financeiro-filter.component.scss'
})
export class ResumoFinanceiroFilterComponent {
  @Input() show!: boolean;
  @Output() apply = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<boolean>();

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
  statusTransacao = ['Atrasado', 'Cancelado', 'Pago', 'Pendente'];
  filtros: Filter = {
    categorias: [''],
    tipo: '',
    pagamento: '',
    status: ['Pendente'],
    contasSelecionadas: [
      this.contaVazia
    ],
    mes: this.getInicioMesPassado(),
  }

  ngOnInit(): void {
    this.getContas();
    this.getCategorias();
    this.onApply();
  }

  onApply() {

    let contaIds = '';

    if(this.filtros.contasSelecionadas)
      contaIds = this.filtros.contasSelecionadas.filter(c => c.id != 0).map(c => c.id).join(', ');

    const filters = {
      categorias: this.filtros.categorias.join(', '),
      tipo: this.filtros.tipo,
      pagamento: this.filtros.pagamento,
      status: this.filtros.status.map(s => s.normalize().toUpperCase().replace(' ', '_')).join(', '),
      contaIds: contaIds,
      mes: formatDate(this.filtros.mes, 'MMMM', 'en-US'),
    };

    console.log(filters);

    this.apply.emit(filters);
  }

  onCriar() {

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
}
