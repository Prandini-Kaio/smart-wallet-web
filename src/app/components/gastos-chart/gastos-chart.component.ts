import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartType, GoogleChartsModule } from 'angular-google-charts';
import { ApiService } from '../../services/api.service';
import { Lancamento, Totalizador } from '../../shared/lancamento/model/lancamento.model';
import { Observable, forkJoin } from 'rxjs';
import { group } from 'node:console';

@Component({
  selector: 'app-gastos-chart',
  standalone: true,
  imports: [CommonModule, GoogleChartsModule],
  templateUrl: './gastos-chart.component.html',
  styleUrls: ['./gastos-chart.component.scss'],
})
export class GastosChartComponent implements OnInit {

  // Totalizador (PIE CHART)
  totalizador: Totalizador = {
    total: 0,
    totalSaida: 0,
    totalEntrada: 0
  };
  public title = 'Desempenho Financeiro';
  public chartData: any[] = [];
  public chartOptions = {
    title: 'Desempenho Financeiro',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors: ['#4caf50', '#f44336', '#2196f3'],
  };
  public chartType = ChartType.PieChart;

  // Totalizadores (BAR CHART)
  totalizadores: Totalizador[] = []
  public comparisonChartData: any[] = [];
  public comparisonChartOptions = {
    title: 'Comparativo de Gastos - Últimos 4 Meses',
    legend: { position: 'bottom' },
    hAxis: { title: 'Meses' },
    vAxis: { title: 'Valores' },
    colors: ['#2196f3', '#f44336'],
  };
  public comparisonChartType = ChartType.Bar;

  lancamentos!: Lancamento[];
  public chartLancamentosData: any[] = [];
  public chartLancOptions = {
    title: 'Lançamentos por Categoria',
    curveType: 'function',
    legend: { position: 'top' },
    colors: ['#4caf50', '#f44336', '#2196f3', '#ff9800', '#9c27b0'],
    vAxis: {
      title: 'Valor',
      minValue: 0,
      format: 'decimal',
    },
    hAxis: {
      title: 'Categoria',
    },
    chartArea: {
      width: '80%',
      height: '70%'
    },
    animation: {
      startup: true,
      easing: 'inAndOut',
      duration: 1000,
    },
  };


  public chartLancType = ChartType.ColumnChart;

  constructor(private readonly _api: ApiService) { }

  ngOnInit() {
    this._api.getTotalizadorTransacoes('').subscribe(response => {
      this.totalizador = response;

      this.chartData = [
        ['Entradas', Math.abs(this.totalizador.totalEntrada)],
        ['Saídas', Math.abs(this.totalizador.totalSaida)],
        ['Saldo', Math.abs(this.totalizador.total)],
      ];
    });

    this.getGastos(4);

    this._api.getLancamento("").subscribe(response => {

      this.lancamentos = response;

      console.log(response)

      const grouped = this.lancamentos.reduce((acc: { [categoria: string]: number }, lancamento: Lancamento) => {
        const categoria = lancamento.categoriaLancamento;
        acc[categoria] = (acc[categoria] || 0) + lancamento.valor;
        return acc;
      }, {});

      this.chartLancamentosData = Object.entries(grouped).map(([categoria, valor]) => [categoria, valor]);
    })
  }

  getGastos(meses: number) {
    const requests = [];

    for (let i = 0; i < meses; i++) {
      const now = new Date();
      const dataInicio = new Date(now.getFullYear(), now.getMonth() + (i - 1), 1);
      const dataFim = new Date(dataInicio);
      dataFim.setMonth(dataInicio.getMonth() + 1);

      const dtInicio = dataInicio.toISOString().replace('Z', '');
      const dtFim = dataFim.toISOString().replace('Z', '');

      const params = {
        dtInicio: dtInicio,
        dtFim: dtFim,
      };

      requests.push(this._api.getTotalizadorTransacoes(params));

    }

    forkJoin(requests).subscribe((responses: any[]) => {
      this.totalizadores = responses;

      this.comparisonChartData = [
        ['Mês Passado', this.totalizadores[0]?.total],
        ['Mês Atual', this.totalizadores[1]?.total],
        ['Próximo Mês 1', this.totalizadores[2]?.total],
        ['Próximo Mês 2', this.totalizadores[3]?.total],
      ];
    });
  }
}