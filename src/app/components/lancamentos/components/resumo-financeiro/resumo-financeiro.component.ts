import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {TransacaoFilterComponent} from "../../../transacoes/transacao-filter/transacao-filter.component";
import {ResumoFinanceiroListComponent} from "./components/resumo-financeiro-list/resumo-financeiro-list.component";

@Component({
  selector: 'app-resumo-financeiro',
  imports: [
    CommonModule,
    TransacaoFilterComponent,
    ResumoFinanceiroListComponent
  ],
  templateUrl: './resumo-financeiro.component.html',
  styleUrl: './resumo-financeiro.component.scss'
})
export class ResumoFinanceiroComponent {

}
