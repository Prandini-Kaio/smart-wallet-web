import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CommonModule} from "@angular/common";
import {ToastrService} from "../../../../shared/services/toastr.service";
import {ContaOutput} from "../../../../shared/model/conta/conta.model";

@Component({
  selector: 'app-assinaturas-novo',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './assinaturas-novo.component.html',
  styleUrl: './assinaturas-novo.component.scss'
})
export class AssinaturasNovoComponent implements OnInit {
  protected assinaturaForm: FormGroup = new FormGroup({});

  protected contas: Array<ContaOutput> = [];
  protected categorias: Array<string> = [];
  protected tipos: string[] = ["ENTRADA", "SAIDA"]
  protected pagamentos: string[] = ["DEBITO", "CREDITO"];

  constructor(private fb: FormBuilder, private readonly api: ApiService, private readonly toaster: ToastrService) {
    this.assinaturaForm = this.fb.group({
      contaId: ['', Validators.required],
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
      pagamento: ['', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
      dtInicio: ['', Validators.required],
      dtFim: [''],
      ativa: [true]
    });
  }

  ngOnInit(): void {

    this.api.getContas('').subscribe((response) => {
      this.contas = response;
    });

    this.api.getCategoria().subscribe((response) => {
      this.categorias = response;
    })
  }

  onSubmit() {
    if (this.assinaturaForm.valid) {

      const contaSelecionada = this.contas.find(conta => conta.id === this.assinaturaForm.value.contaId);

      console.log(this.assinaturaForm.value)

      this.api.createAssinatura(this.assinaturaForm.value).subscribe(() => {
        this.toaster.success("Assinatura criada com sucesso!", 3000);
      });
    }
  }

  onClear() {
    this.assinaturaForm.reset();
  }
}
