import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ContaFilter } from '../../shared/conta/conta.model';

interface Filter {
  categoria: string,
  tipo: string,
  pagamento: string,
  status: string,
  conta: ContaFilter,
  dtInicio: string,
  dtFim: string
}

@Component({
  selector: 'app-lancamento-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './lancamento-filter.component.html',
  styleUrl: './lancamento-filter.component.scss'
})
export class LancamentoFilterComponent implements OnInit {

  @Input() show!: boolean;
  @Output() apply = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<boolean>();

  constructor(private _api: ApiService) { }

  contaVazia = {}

  categorias: Array<string> = [];
  contas: Array<any> = [];
  tiposLancamento = ['ENTRADA', 'SAIDA'];
  tiposPagamento = ['DEBITO', 'CREDITO'];
  statusLancamento = ['Em Aberto', 'Quitado', 'Cancelado'];
  filtros: Filter = {
    categoria: '',
    tipo: '',
    pagamento: '',
    status: '',
    conta: {
      nome: '',
      banco: '',
      tipoConta: '',
      diaVencimento: ''
    },
    dtInicio: this.getInicioMesPassado(),
    dtFim: this.getFimMesPassado()
  }

  ngOnInit(): void {
    this.getContas();
    this.getCategorias();
  }

  onApply() {

    console.log("CONTA")
    console.log(this.filtros.conta)

    const filters = {
      categoria: this.filtros.categoria,
      tipo: this.filtros.tipo,
      pagamento: this.filtros.pagamento,
      status: this.filtros.status,
      nomeConta: this.filtros.conta.nome,
      bancoConta: this.filtros.conta.banco,
      dtInicio: formatDate(this.filtros.dtInicio, 'yyyy-MM-ddT00:00:00', 'en-US'),
      dtFim: formatDate(this.filtros.dtFim, 'yyyy-MM-ddT23:59:59', 'en-US')
    };

    this.apply.emit(filters);
  }

  onToggle() {
    this.toggle.emit(!this.show);
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
