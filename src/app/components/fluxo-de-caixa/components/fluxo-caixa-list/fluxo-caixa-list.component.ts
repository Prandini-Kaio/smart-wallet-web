import { Component } from '@angular/core';
import {FluxoCaixaOutput} from "../model/fluxo-de-caixa.model";
import {ApiService} from "../../../../services/api.service";
import {ToastrService} from "../../../../shared/services/toastr.service";
import {FluxoDeCaixaFilterComponent} from "../fluxo-de-caixa-filter/fluxo-de-caixa-filter.component";
import {FluxoCaixaTotalizadoresComponent} from "../fluxo-caixa-totalizadores/fluxo-caixa-totalizadores.component";
import {CommonModule} from "@angular/common";
import {FluxoCaixaItemComponent} from "../fluxo-caixa-item/fluxo-caixa-item.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-fluxo-caixa-list',
  imports: [
    CommonModule,
    FluxoDeCaixaFilterComponent,
    FluxoCaixaTotalizadoresComponent,
    FluxoCaixaItemComponent,
    MatProgressSpinner
  ],
  templateUrl: './fluxo-caixa-list.component.html',
  styleUrl: './fluxo-caixa-list.component.scss'
})
export class FluxoCaixaListComponent {

  public loading = true;
  public output: FluxoCaixaOutput | null = null;

  constructor(private readonly api: ApiService, private toastr: ToastrService) {}

  onApply(param: any){

    this.loading = true;
    this.toastr.info('Buscando fluxo caixa', 3000);

    this.api.getFluxoCaixa(param).subscribe((response) => {
      this.output = response
      this.loading = false;
      this.toastr.success('Fluxo caixa calculado com sucesso!', 3000);
    });
  }
}
