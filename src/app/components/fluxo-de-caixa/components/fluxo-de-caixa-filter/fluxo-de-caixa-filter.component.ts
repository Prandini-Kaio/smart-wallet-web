import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule, formatDate} from "@angular/common";
import {ApiService} from "../../../../services/api.service";
import {ContaOutput} from "../../../../shared/model/conta/conta.model";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";


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
  selector: 'app-fluxo-de-caixa-filter',
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
    MatDatepickerModule
  ],
  templateUrl: './fluxo-de-caixa-filter.component.html',
  styleUrl: './fluxo-de-caixa-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FluxoDeCaixaFilterComponent {
  @Input() show!: boolean;
  @Output() apply = new EventEmitter<any>();
  @Output() toggle = new EventEmitter<boolean>();

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
  public contasSelecionadas: any[] = [this.contaVazia];

  ngOnInit(): void {
    this.getContas();
    this.onApply();
  }

  initFilters() {
    this.filtro = new FormGroup({
      conta: new FormControl(this.contaVazia)
    })
  }

  onApply() {

    const params = {
      contaIds: this.contasSelecionadas.filter(c => c && Number(c.id) !== 0).map(c => c.id).join(', '),
      dtInicio: formatDate(this.filtro.get('dtInicio')?.value, 'yyyy-MM-dd', 'en-US'),
      dtFim: formatDate(this.filtro.get('dtFim')?.value, 'yyyy-MM-dd', 'en-US'),
    }

    console.log(params);

    this.apply.emit(params);
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
