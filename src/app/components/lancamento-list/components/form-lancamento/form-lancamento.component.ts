import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LancamentoOutput } from '../../../../shared/lancamento/model/lancamento.model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContaOutput } from '../../../../shared/conta/conta.model';
import { ApiService } from '../../../../services/api.service';
import { parse } from 'date-fns';
import { LancamentoServiceService } from '../../../add-lancamento/service/lancamento-service.service';

@Component({
  selector: 'app-form-lancamento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './form-lancamento.component.html',
  styleUrl: './form-lancamento.component.scss',
})
export class FormLancamentoComponent implements OnInit, OnDestroy {
  @Input() title: string = "Lançamento"
  @Output() enviar = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();

  protected form: FormGroup = new FormGroup({});

  protected contas: Array<ContaOutput> = [];
  protected categorias: Array<string> = [];
  protected selectedConta: ContaOutput | null = null;

  constructor(
    private readonly api: ApiService,
    private readonly lancamentoService: LancamentoServiceService
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

  getContas() {
    this.api.getContas('').subscribe((response) => {
      this.contas = response;
    });
  }

  getCategorias() {
    this.api.getCategoria().subscribe((response) => {
      this.categorias = response;
    });
  }

  loadForm() {
    const today = new Date().toISOString().split('T')[0];

    const lancamento = this.lancamentoService.getLancamento();

    this.form = new FormGroup({
      conta: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
      tipoLancamento: new FormControl('', Validators.required),
      tipoPagamento: new FormControl('', Validators.required),
      categoriaLancamento: new FormControl('', Validators.required),
      parcelas: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      dtCriacao: new FormControl(today, Validators.required),
    });

    if (lancamento) {
      this.form = new FormGroup({
        id: new FormControl(lancamento.id),
        conta: new FormControl(lancamento.conta, Validators.required),
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
        dtCriacao: new FormControl(
          parse(lancamento.dtCriacao, 'dd/MM/yyyy HH:mm:ss', new Date())
            .toISOString()
            .split('T')[0],
          Validators.required
        ),
      });
    }
  }

  onSubmitForm() {
    const params = this.montarEnvio();
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

      const contaSelecionada = this.contas.find(
        (c) => c.id === this.form.get('conta')?.value
      );

      const lancamento = {
        conta: {
          nome: contaSelecionada?.nome,
          banco: contaSelecionada?.banco,
          tipoConta: contaSelecionada?.tipoConta,
          diaVencimento: contaSelecionada?.dtVencimento,
        },
        valor: this.form.get('valor')?.value,
        tipoLancamento: this.form.get('tipoLancamento')?.value,
        tipoPagamento: this.form.get('tipoPagamento')?.value,
        categoriaLancamento: this.form.get('categoriaLancamento')?.value,
        parcelas: this.form.get('parcelas')?.value,
        descricao: this.form.get('descricao')?.value,
        dtCriacao: dtCriacaoValue.toISOString(),
      };

      return lancamento;
    }
  }
}
