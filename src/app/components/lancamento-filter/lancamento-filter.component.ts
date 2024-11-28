import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-lancamento-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lancamento-filter.component.html',
  styleUrl: './lancamento-filter.component.scss'
})
export class LancamentoFilterComponent implements OnInit {

  @Input() show!: boolean;
  @Output() apply = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<boolean>();

  constructor(private _api: ApiService) { }

  categorias: Array<string> = [];
  contas: Array<any> = [];
  tiposLancamento = ['ENTRADA', 'SAIDA'];
  tiposPagamento = ['DEBITO', 'CREDITO'];
  statusLancamento = ['Em Aberto', 'Quitado', 'Cancelado'];
  filtros = {
    categoria: '',
    tipoLancamento: '',
    tipoPagamento: '',
    status: '',
    conta: '',
    dtInicio: this.getInicioMesPassado(),
    dtFim: this.getFimMesPassado()
  };

  ngOnInit(): void {
    this.getContas();
    this.getCategorias();
  }

  onApply() {
    const filters = {
      categoria: this.filtros.categoria,
      tipoLancamento: this.filtros.tipoLancamento,
      tipoPagamento: this.filtros.tipoPagamento,
      status: this.filtros.status,
      conta: this.filtros.conta,
      dtInicio: formatDate(this.filtros.dtInicio, 'yyyy-MM-ddT00:00:00', 'en-US'),
      dtFim: formatDate(this.filtros.dtFim, 'yyyy-MM-ddT23:59:59', 'en-US')
    };

    this.apply.emit(filters);
  }

  onToggle() {
    this.toggle.emit(!this.show);
  }

  getContas() {
    this._api.getContas("").subscribe((response) => {
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
