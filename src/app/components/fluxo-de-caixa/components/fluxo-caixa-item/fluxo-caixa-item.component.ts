import {Component, Input} from '@angular/core';
import {LancamentosProjetadosOutput} from "../model/fluxo-de-caixa.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-fluxo-caixa-item',
  imports: [
    CommonModule
  ],
  templateUrl: './fluxo-caixa-item.component.html',
  styleUrl: './fluxo-caixa-item.component.scss'
})
export class FluxoCaixaItemComponent {
  @Input() lancamento: LancamentosProjetadosOutput | null = null;

}
