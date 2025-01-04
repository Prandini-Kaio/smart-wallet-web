import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Orcamento } from '../../../../../shared/model/orcamento/orcamento.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core'; // Ou MatMomentDateModule, se preferir usar Moment.js
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'; // Para ícones, caso necessário
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../../../services/api.service';

interface Mes {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'app-orcamento-form',
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
    templateUrl: './orcamento-form.component.html',
    styleUrl: './orcamento-form.component.scss'
})
export class OrcamentoFormComponent implements OnInit{
  @Output() submit = new EventEmitter<FormGroup>();
  @Output() close = new EventEmitter;

  public categoriaSelecionada = '';
  public categorias: string[] = [];

  public mesSelecionado: Mes = {value: 'JANUARY', viewValue: 'Janeiro'};
  public meses: Mes[] = [
    {value: 'JANUARY', viewValue: 'Janeiro'},
    {value: 'FEBRUARY', viewValue: 'Fevereiro'},
    {value: 'MARCH', viewValue: 'Março'},
    {value: 'APRIL', viewValue: 'Abril'},
    {value: 'MAY', viewValue: 'Maio'},
    {value: 'JUNE', viewValue: 'Junho'},
    {value: 'JULY', viewValue: 'Julho'},
    {value: 'AUGUST', viewValue: 'Agosto'},
    {value: 'SEPTEMBER', viewValue: 'Setembro'},
    {value: 'OCTOBER', viewValue: 'Outubro'},
    {value: 'NOVEMBER', viewValue: 'Novembro'},
    {value: 'DECEMBER', viewValue: 'Dezembro'},
  ]

  public form: FormGroup = new FormGroup({
    valor: new FormControl(0, Validators.required),
    categoria: new FormControl('', Validators.required),
    mes: new FormControl('', Validators.required),
  });

  constructor(private readonly api: ApiService) { }

  ngOnInit(): void {

    this.api.getCategoria().subscribe((data) => {
      this.categorias = data;
    });

    this.form = new FormGroup({
      valor: new FormControl(0, Validators.required),
      categoria: new FormControl('', Validators.required),
      mes: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.submit.emit(this.form);
    this.onClose();
  }

  onClose() {
    this.close.emit();
  }
}
