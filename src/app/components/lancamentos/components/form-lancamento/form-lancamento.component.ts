import {CommonModule, formatDate} from '@angular/common';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output,} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ContaOutput} from '../../../../shared/model/conta/conta.model';
import {ApiService} from '../../../../services/api.service';
import {format, parse} from 'date-fns';
import {LancamentoService} from '../../service/lancamento.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {TipoLancamento} from "../../../../shared/model/lancamento/model/lancamento.model";

@Component({
    selector: 'app-form-lancamento',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    templateUrl: './form-lancamento.component.html',
    styleUrl: './form-lancamento.component.scss'
})
export class FormLancamentoComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Lançamento';
  @Output() enviar = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();

  protected form: FormGroup = new FormGroup({});

  protected contas: Array<ContaOutput> = [];
  protected categorias: Array<string> = [];
  protected tipoLancamento: Array<string> = Object.values(TipoLancamento);
  protected selectedConta: ContaOutput | null = null;

  constructor(
    private readonly api: ApiService,
    private readonly lancamentoService: LancamentoService
  ) {}

  ngOnInit(): void {
    this.api.getContas('').subscribe((response) => {
      this.contas = response;
    });

    this.api.getCategoria().subscribe((response) => {
      this.categorias = response;
    });

    this.loadForm();
  }

  ngOnDestroy(): void {
    this.lancamentoService.clear();
  }

  loadForm() {
    const today = new Date().toISOString().split('T')[0];

    const lancamento = this.lancamentoService.getLancamento();

    if (lancamento) {
      const data = parse(
        lancamento.dtCriacao,
        'dd/MM/yyyy HH:mm:ss',
        new Date()
      )
        .toISOString()
        .split('T')[0];

      this.form = new FormGroup({
        id: new FormControl(lancamento.id),
        contaDestino: new FormControl(lancamento.contaDestino.id, Validators.required),
        contaOrigem: new FormControl(lancamento.contaOrigem.id, Validators.required),
        valor: new FormControl(lancamento.valor, Validators.required),
        tipoLancamento: new FormControl(
          lancamento.tipoLancamento
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase(),
          Validators.required
        ),
        tipoPagamento: new FormControl(
          lancamento.tipoPagamento
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase(),
          Validators.required
        ),
        categoriaLancamento: new FormControl(
          lancamento.categoriaLancamento.toUpperCase(),
          Validators.required
        ),
        parcelas: new FormControl(lancamento.parcelas, Validators.required),
        descricao: new FormControl(lancamento.descricao, Validators.required),
        dtCriacao: new FormControl(format(
          parse(lancamento.dtCriacao, 'dd/MM/yyyy HH:mm:ss', new Date()),
          'yyyy-MM-dd'
        ), Validators.required),
        status: new FormControl(lancamento.status.replace(" ", "_").toUpperCase()),
      });
    } else {
      this.form = new FormGroup({
        contaDestino: new FormControl('', Validators.required),
        contaOrigem: new FormControl(''),
        valor: new FormControl('', Validators.required),
        tipoLancamento: new FormControl('', Validators.required),
        tipoPagamento: new FormControl('', Validators.required),
        categoriaLancamento: new FormControl('', Validators.required),
        parcelas: new FormControl('', Validators.required),
        descricao: new FormControl('', Validators.required),
        dtCriacao: new FormControl(today, Validators.required),
      });
    }
  }

  onSubmitForm() {
    const params = this.montarEnvio();
    console.log(params);
    this.enviar.emit(params);
  }

  onCancel() {
    this.cancel.emit();
  }

  montarEnvio(): any {
    if (this.form.valid) {
      const dtCriacaoValue = new Date(this.form.get('dtCriacao')?.value);

      const currentDateTime = new Date();
      dtCriacaoValue.setHours(
        currentDateTime.getHours(),
        currentDateTime.getMinutes(),
        currentDateTime.getSeconds()
      );

      const contaDestinoSelecionada = this.contas.find(
        (c) => c.id === this.form.get('contaDestino')?.value
      );

      const contaOrigemSelecionada = this.contas.find(
        (c) => c.id === this.form.get('contaOrigem')?.value
      );

      const diaVencimento = contaDestinoSelecionada?.dtVencimento
        ? new Date(contaDestinoSelecionada.dtVencimento).getDay()
        : '';


        console.log("CRIACAO 2")
        console.log(dtCriacaoValue.toISOString())

      const lancamento = {
        id: this.form.get('id')?.value,
        contaDestinoId: this.form.get('contaDestino')?.value,
        contaOrigemId: this.form.get('contaOrigem')?.value,
        status: this.form.get('status')?.value,
        valor: this.form.get('valor')?.value,
        tipoLancamento: this.form.get('tipoLancamento')?.value,
        tipoPagamento: this.form.get('tipoPagamento')?.value,
        categoriaLancamento: this.form.get('categoriaLancamento')?.value,
        parcelas: this.form.get('parcelas')?.value,
        descricao: this.form.get('descricao')?.value,
        dtCriacao: formatDate(dtCriacaoValue, 'yyyy-MM-ddTHH:mm:ss', 'en-Us'),
      };

      return lancamento;
    }
  }
}
