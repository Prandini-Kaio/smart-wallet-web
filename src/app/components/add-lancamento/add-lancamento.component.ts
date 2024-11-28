import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-lancamento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-lancamento.component.html',
  styleUrl: './add-lancamento.component.scss'
})
export class AddLancamentoComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  contas: Array<any> = [];
  categorias: Array<string> = [];

  constructor(
    private http: HttpClient, 
    private _repository: ApiService,
    private _route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    const today = new Date().toISOString().split('T')[0];

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

    this.getContas();
    this.getCategorias();
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

      console.log(dtCriacaoValue.toString())
      console.log(currentDateTime.toString())
      console.log(dtCriacaoValue.toISOString())

      const lancamento = {
        conta: this.form.get('conta')?.value,
        valor: this.form.get('valor')?.value,
        tipoLancamento: this.form.get('tipoLancamento')?.value,
        tipoPagamento: this.form.get('tipoPagamento')?.value,
        categoriaLancamento: this.form.get('categoriaLancamento')?.value,
        parcelas: this.form.get('parcelas')?.value,
        descricao: this.form.get('descricao')?.value,
        dtCriacao: dtCriacaoValue.toISOString(), 
      };

      this._repository.createLancamento(lancamento).subscribe((response) => {
        this.showSuccess();
      }, (error) => {
        console.log(error);
        this.showError();
      });
    }
  }

  onCancel() : void {
    this._route.navigate(['/lancamentos/view']);
  }

  showSuccess() {
    this.toastr.success('Gravado com sucesso!', 'Sucesso');
  }

  showError() {
    this.toastr.error('Oops! Algo deu errado.', 'Erro');
  }
}