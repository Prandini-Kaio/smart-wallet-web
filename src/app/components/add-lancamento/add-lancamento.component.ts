import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ContaFilter, ContaOutput } from '../../shared/conta/conta.model';
import { LancamentoOutput } from '../../shared/lancamento/model/lancamento.model';
import { parse } from 'date-fns';
import { LancamentoServiceService } from './service/lancamento-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-lancamento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-lancamento.component.html',
  styleUrl: './add-lancamento.component.scss'
})
export class AddLancamentoComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({});
  private routerSubscription!: Subscription;

  contas: Array<ContaOutput> = [];
  categorias: Array<string> = [];

  selectedConta: ContaOutput | null = null;

  constructor(
    private http: HttpClient,
    private _repository: ApiService,
    private _route: Router,
    private toastr: ToastrService,
    private lancamentoService: LancamentoServiceService
  ) { }

  ngOnInit(): void {

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
          lancamento.tipoLancamento.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase(),
          Validators.required
        ),
        tipoPagamento: new FormControl(
          lancamento.tipoPagamento.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase(),
          Validators.required
        ),
        categoriaLancamento: new FormControl(lancamento.categoriaLancamento.toUpperCase(), Validators.required),
        parcelas: new FormControl(lancamento.parcelas, Validators.required),
        descricao: new FormControl(lancamento.descricao, Validators.required),
        dtCriacao: new FormControl(
          parse(lancamento.dtCriacao, 'dd/MM/yyyy HH:mm:ss', new Date()).toISOString().split('T')[0],
          Validators.required
        ),
      });
    }

    this.getContas();
    this.getCategorias();
  }

  ngOnDestroy(): void {
    this.lancamentoService.clear();
  }

  getContas() {
    this._repository.getContas("").subscribe((response) => {
      this.contas = response;
    }, (error) => {
      console.error(error);
    })
  }

  getCategorias() {
    this._repository.getCategoria().subscribe((response) => {
      this.categorias = response;
    }, (error) => {
      console.error(error);
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const dtCriacaoValue = new Date(this.form.get('dtCriacao')?.value);
      const currentDateTime = new Date();
      dtCriacaoValue.setHours(currentDateTime.getHours(), currentDateTime.getMinutes(), currentDateTime.getSeconds());

      const contaSelecionada = this.contas.find(c => c.id === this.form.get('conta')?.value);

      const lancamento = {
        conta: {
          nome: contaSelecionada?.nome,
          banco: contaSelecionada?.banco,
          tipoConta: contaSelecionada?.tipoConta,
          diaVencimento: contaSelecionada?.dtVencimento
        },
        valor: this.form.get('valor')?.value,
        tipoLancamento: this.form.get('tipoLancamento')?.value,
        tipoPagamento: this.form.get('tipoPagamento')?.value,
        categoriaLancamento: this.form.get('categoriaLancamento')?.value,
        parcelas: this.form.get('parcelas')?.value,
        descricao: this.form.get('descricao')?.value,
        dtCriacao: dtCriacaoValue.toISOString(),
      };

      this._repository.createLancamento(lancamento).subscribe((response) => {
        this.toastr.success("Sucesso!", "Lancamento criado com sucesso.");
      }, (error) => {
        this.toastr.error("Erro: ", error?.error.message);
      });
    }

    this._route.navigate(['/lancamentos/view'])
  }

  onCancel(): void {
    this._route.navigate(['/lancamentos/view']);
  }
}