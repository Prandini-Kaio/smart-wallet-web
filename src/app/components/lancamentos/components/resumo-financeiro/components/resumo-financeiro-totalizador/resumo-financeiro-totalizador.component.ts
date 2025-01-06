import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ResumoFinanceiroOutput} from "../../../../../../shared/model/lancamento/model/lancamento.model";


export interface TotalizadorResumoFinanceiroOutput {
  entradas: number;
  saidas: number;
  saldoProjetado: number;
}

@Component({
  selector: 'app-resumo-financeiro-totalizador',
  imports: [
    CommonModule,
    MatProgressSpinner
  ],
  templateUrl: './resumo-financeiro-totalizador.component.html',
  styleUrl: './resumo-financeiro-totalizador.component.scss'
})
export class ResumoFinanceiroTotalizadorComponent {

  @Input() resumoFinanceiro: TotalizadorResumoFinanceiroOutput | null = null;

  public loading = false;
}
