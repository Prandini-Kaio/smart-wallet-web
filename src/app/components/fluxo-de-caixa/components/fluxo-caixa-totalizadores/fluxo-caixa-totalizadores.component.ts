import {Component, Input} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";
import {FluxoCaixaOutput} from "../model/fluxo-de-caixa.model";

@Component({
  selector: 'app-fluxo-caixa-totalizadores',
  imports: [
    CommonModule,
    MatProgressSpinner
  ],
  templateUrl: './fluxo-caixa-totalizadores.component.html',
  styleUrl: './fluxo-caixa-totalizadores.component.scss'
})
export class FluxoCaixaTotalizadoresComponent {

  @Input() public fluxoCaixa: FluxoCaixaOutput | null = null;

  public loading = false;

}
