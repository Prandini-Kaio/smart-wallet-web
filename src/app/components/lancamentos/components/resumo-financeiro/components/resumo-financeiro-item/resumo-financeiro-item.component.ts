import {Component, Input} from '@angular/core';
import {ResumoFinanceiroOutput} from "../../../../../../shared/model/lancamento/model/lancamento.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-resumo-financeiro-item',
  imports: [
    CommonModule
  ],
  templateUrl: './resumo-financeiro-item.component.html',
  styleUrl: './resumo-financeiro-item.component.scss'
})
export class ResumoFinanceiroItemComponent {
  @Input() resumo: ResumoFinanceiroOutput | null = null;
}
