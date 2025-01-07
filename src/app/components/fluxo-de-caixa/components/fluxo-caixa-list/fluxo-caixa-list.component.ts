import {Component, OnInit} from '@angular/core';
import {FluxoCaixaOutput} from "../model/fluxo-de-caixa.model";
import {ApiService} from "../../../../services/api.service";
import {ToastrService} from "../../../../shared/services/toastr.service";
import {FluxoDeCaixaFilterComponent} from "../fluxo-de-caixa-filter/fluxo-de-caixa-filter.component";
import {FluxoCaixaTotalizadoresComponent} from "../fluxo-caixa-totalizadores/fluxo-caixa-totalizadores.component";
import {CommonModule, formatDate} from "@angular/common";
import {FluxoCaixaItemComponent} from "../fluxo-caixa-item/fluxo-caixa-item.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatTabChangeEvent, MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-fluxo-caixa-list',
  imports: [
    CommonModule,
    FluxoDeCaixaFilterComponent,
    FluxoCaixaTotalizadoresComponent,
    FluxoCaixaItemComponent,
    MatProgressSpinner,
    MatTabsModule,
    MatTableModule
  ],
  templateUrl: './fluxo-caixa-list.component.html',
  styleUrl: './fluxo-caixa-list.component.scss'
})
export class FluxoCaixaListComponent implements OnInit{

  public displayedColumns: string[] = ['Conta', 'Descricao', 'Categoria', 'Status', 'Data Vencimento', 'Entradas', 'Saidas'];

  public loading = true;
  public output: FluxoCaixaOutput | null = null;
  public meses: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  private param: { [key: string]: any } = {};

  constructor(private readonly api: ApiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.param['mes'] = 'January';
  }

  onApply(param: any){

    this.loading = true;
    this.toastr.info('Buscando fluxo caixa', 3000);

    const updtParam = { ...this.param, param };

    this.api.getFluxoCaixa(updtParam).subscribe((response) => {
      this.output = response;
      this.loading = false;
    });
  }

  onTabChange(event: MatTabChangeEvent) {

    this.output = null;
    this.loading = true;

    const monthMapping: { [key: string]: number } = {
      'Janeiro': 0,
      'Fevereiro': 1,
      'Março': 2,
      'Abril': 3,
      'Maio': 4,
      'Junho': 5,
      'Julho': 6,
      'Agosto': 7,
      'Setembro': 8,
      'Outubro': 9,
      'Novembro': 10,
      'Dezembro': 11
    };

    const selectedTabTitle = event.tab.textLabel;
    const monthNumber = monthMapping[selectedTabTitle];
    const currentYear = new Date().getFullYear();
    const date = new Date(currentYear, monthNumber, 1);

    this.param['mes'] = formatDate(date.toISOString().split('T')[0], 'MMMM', 'en-US');

    this.onApply(this.param);
  }
}
