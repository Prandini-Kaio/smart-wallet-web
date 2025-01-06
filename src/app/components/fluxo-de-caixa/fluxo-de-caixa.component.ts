import { Component } from '@angular/core';
import {PageHeaderComponent} from "../../shared/components/page-header/page-header.component";
import {FluxoDeCaixaFilterComponent} from "./components/fluxo-de-caixa-filter/fluxo-de-caixa-filter.component";
import {
  FluxoCaixaTotalizadoresComponent
} from "./components/fluxo-caixa-totalizadores/fluxo-caixa-totalizadores.component";
import {FluxoCaixaOutput} from "./components/model/fluxo-de-caixa.model";
import {ToastrService} from "../../shared/services/toastr.service";
import {ApiService} from "../../services/api.service";
import {MatTabsModule} from "@angular/material/tabs";
import {FluxoCaixaListComponent} from "./components/fluxo-caixa-list/fluxo-caixa-list.component";

@Component({
  selector: 'app-fluxo-de-caixa',
  imports: [
    PageHeaderComponent,
    MatTabsModule,
    FluxoCaixaListComponent
  ],
  templateUrl: './fluxo-de-caixa.component.html',
  styleUrl: './fluxo-de-caixa.component.scss'
})
export class FluxoDeCaixaComponent {

  public output: FluxoCaixaOutput | null = null;

  constructor(private readonly api: ApiService, private toastr: ToastrService) {}

  onApply(param: any){
      this.api.getFluxoCaixa(param).subscribe((response) => {
          this.output = response
          this.toastr.info('Buscando fluxo caixa', 3000);
      });
  }
}
