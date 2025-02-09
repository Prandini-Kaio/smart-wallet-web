import {CommonModule, formatDate} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core'; // Ou MatMomentDateModule, se preferir usar Moment.js
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ApiService} from '../../../../services/api.service';
import {ContaOutput} from '../../../../shared/model/conta/conta.model';
import {
  StatusLancamento,
  TipoLancamento,
  TipoPagamento
} from "../../../../shared/model/lancamento/model/lancamento.model";

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
    styleUrl: './lancamento-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LancamentoFilterComponent implements OnInit {

  @Output() apply = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();

  constructor(private _api: ApiService) { }

  public filtro: FormGroup = new FormGroup({
    dtInicio: new FormControl<Date | null>(null),
    dtFim: new FormControl<Date | null>(null),
  });


  protected contaVazia = {
    id: 0,
    banco: '',
    nome: '',
    dtVencimento: '',
    dtFechamento: '',
    tipoConta: '',
    saldoParcial: 0,
    color: '',
  }

  public contas: Array<any> = [];

  public contasDestinoSelecionadas: any[] = [this.contaVazia];
  public contasOrigemSelecionadas: any[] = [this.contaVazia];

  public categorias: Array<string> = [];
  public categoriasSelecionadas: string[] = [''];

  public statusLancamento: string[] = Object.values(StatusLancamento)
  public statusSelecionados: string[] = [''];

  public tiposLancamento = Object.values(TipoLancamento)
  public tiposPagamento = Object.values(TipoPagamento)

  ngOnInit(): void {
    this.getContas();
    this.getCategorias();
    this.initFilters();
    this.onApply();
  }

  onCriar() {
    this.create.emit(null);
  }

  initFilters() {
    this.filtro = new FormGroup({
      categoria: new FormControl(''),
      tipo: new FormControl(''),
      pagamento: new FormControl(''),
      status: new FormControl(''),
      contaIds: new FormControl(''),
      dtInicio: new FormControl(this.getInicioMesPassado()),
      dtFim: new FormControl(this.getFimMesPassado()),
    });
  }

  onApply() {
    let contaIds = '';

    const params = {
      categorias: this.categoriasSelecionadas.join(', '),
      tipo: this.filtro.get('tipo')?.value,
      pagamento: this.filtro.get('pagamento')?.value,
      status: this.statusSelecionados.map(c => c.replaceAll(' ', '_').toUpperCase()).join(', '),
      contaDestinoIds: this.contasDestinoSelecionadas.filter(c => c && Number(c.id) !== 0).map(c => c.id).join(', '),
      contaOrigemIds: this.contasOrigemSelecionadas.filter(c => c && Number(c.id) !== 0).map(c => c.id).join(', '),
      dtInicio: formatDate(this.filtro.get('dtInicio')?.value, 'yyyy-MM-ddT00:00:00', 'en-US'),
      dtFim: formatDate(this.filtro.get('dtFim')?.value, 'yyyy-MM-ddT23:59:59', 'en-US'),
    }

    this.apply.emit(params);
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
