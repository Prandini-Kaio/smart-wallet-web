import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContaOutput, TipoContaOutput } from '../../../shared/conta/conta.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core'; // Ou MatMomentDateModule, se preferir usar Moment.js
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'; // Para ícones, caso necessário
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-conta-form',
  standalone: true,
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
  templateUrl: './conta-form.component.html',
  styleUrl: './conta-form.component.scss'
})
export class EditModalComponent implements OnInit {

  @Input() conta: ContaOutput | undefined;
  @Output() submit = new EventEmitter<FormGroup>;
  @Output() close = new EventEmitter;


  public tipoContas: TipoContaOutput[] = [];

  form: FormGroup = new FormGroup({});

  constructor(private readonly api: ApiService) { }


  ngOnInit(): void {

    this.api.getTipoConta().subscribe((data) => {
      this.tipoContas = data;
    });


    if (this.conta) {
      this.form = new FormGroup({
        id: new FormControl(this.conta.id, Validators.required),
        banco: new FormControl(this.conta.banco, Validators.required),
        nome: new FormControl(this.conta.nome, Validators.required),
        tipoConta: new FormControl(this.conta.tipoConta, Validators.required),
        diaVencimento: new FormControl(Number.parseFloat(this.conta.dtVencimento), Validators.required),
        diaFechamento: new FormControl(Number.parseFloat(this.conta.dtFechamento), Validators.required),
        color: new FormControl(this.conta.color, Validators.required)
      });
    } else {
      this.form = new FormGroup({
        id: new FormControl(0, Validators.required),
        banco: new FormControl('', Validators.required),
        nome: new FormControl('', Validators.required),
        tipoConta: new FormControl('', Validators.required),
        diaVencimento: new FormControl(0, Validators.required),
        diaFechamento: new FormControl(0, Validators.required),
        color: new FormControl('#000000', Validators.required)
      });
    }
  }

  onSubmit(){
    this.submit.emit(this.form);
  }

  onClose() {
    this.close.emit();
  }
}
