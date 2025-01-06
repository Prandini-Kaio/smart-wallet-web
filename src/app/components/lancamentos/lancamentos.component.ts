import {Component} from '@angular/core';
import {PageHeaderComponent} from "../../shared/components/page-header/page-header.component";
import {MatTabsModule} from "@angular/material/tabs";
import { LancamentoListComponent } from "./components/lancamento-list/lancamento-list.component";
import {TransacaoListComponent} from "../transacoes/transacao-list/transacao-list.component";
import {ResumoFinanceiroComponent} from "./components/resumo-financeiro/resumo-financeiro.component";

@Component({
  selector: 'app-lancamentos',
  imports: [
    PageHeaderComponent,
    MatTabsModule,
    LancamentoListComponent,
    TransacaoListComponent,
    ResumoFinanceiroComponent
  ],
  templateUrl: './lancamentos.component.html',
  styleUrl: './lancamentos.component.scss'
})
export class LancamentosComponent {

}
