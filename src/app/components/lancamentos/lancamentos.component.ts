import {Component} from '@angular/core';
import {PageHeaderComponent} from "../../shared/components/page-header/page-header.component";
import {MatTabsModule} from "@angular/material/tabs";
import { LancamentoListComponent } from "./components/lancamento-list/lancamento-list.component";
import {TransacaoListComponent} from "../transacao-list/transacao-list.component";

@Component({
  selector: 'app-lancamentos',
  imports: [
    PageHeaderComponent,
    MatTabsModule,
    LancamentoListComponent,
    TransacaoListComponent
  ],
  templateUrl: './lancamentos.component.html',
  styleUrl: './lancamentos.component.scss'
})
export class LancamentosComponent {

}
