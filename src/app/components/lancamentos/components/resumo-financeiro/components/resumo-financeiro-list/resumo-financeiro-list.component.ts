import { CommonModule, formatDate } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatTabChangeEvent, MatTabsModule } from "@angular/material/tabs";
import { ApiService } from "../../../../../../services/api.service";
import { ResumoFinanceiroOutput } from "../../../../../../shared/model/lancamento/model/lancamento.model";
import { ToastrService } from "../../../../../../shared/services/toastr.service";
import { ResumoFinanceiroFilterComponent } from "../resumo-financeiro-filter/resumo-financeiro-filter.component";
import { ResumoFinanceiroItemComponent } from "../resumo-financeiro-item/resumo-financeiro-item.component";
import {
  ResumoFinanceiroTotalizadorComponent,
  TotalizadorResumoFinanceiroOutput
} from "../resumo-financeiro-totalizador/resumo-financeiro-totalizador.component";

@Component({
  selector: 'app-resumo-financeiro-list',
  imports: [
    CommonModule,
    ResumoFinanceiroFilterComponent,
    ResumoFinanceiroTotalizadorComponent,
    ResumoFinanceiroItemComponent,
    MatProgressSpinner,
    MatTabsModule,
    MatTableModule
  ],
  templateUrl: './resumo-financeiro-list.component.html',
  styleUrl: './resumo-financeiro-list.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ResumoFinanceiroListComponent implements OnInit{

  constructor(private readonly api: ApiService, private toastr: ToastrService) {}

  public displayedColumns: string[] = ['Conta', 'Entradas', 'Saidas'];

  public resumos: ResumoFinanceiroOutput[] = [];
  public loading = false;
  public meses: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  protected totalizador: TotalizadorResumoFinanceiroOutput | null = null;

  private param: { [key: string]: any } = {};

  ngOnInit() {
    this.param['mes'] = 'January'
  }

  onApply(params: any) {
    this.loading = true;

    const updtparams = { ...this.param, params}

    this.api.getResumoFinanceiro(updtparams).subscribe((res) => {
      this.resumos = res;
      this.resumosToTotalizador();
      this.loading = false;
    });
  }

  resumosToTotalizador() {
    // Converte os resumos com valor de entrada e saida para um totalizador
    const totalizador: TotalizadorResumoFinanceiroOutput = {
      entradas: 0,
      saidas: 0,
      saldoProjetado: 0,
    };

    this.resumos.forEach((resumo) => {
      totalizador.entradas += resumo.entradas;
      totalizador.saidas += resumo.saidas;
    });

    totalizador.saldoProjetado = totalizador.entradas - totalizador.saidas;

    this.totalizador = totalizador;
  }

  onTabChange(event: MatTabChangeEvent) {

    this.resumos = [];
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
