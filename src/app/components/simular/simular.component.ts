import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { ContaOutput } from '../../shared/conta/conta.model';
import { TransacaoOutput } from '../../shared/lancamento/model/lancamento.model';


interface ContaTransacoes {
  conta: ContaOutput;
  entradas: number;
  saidas: number;
  saldo: number;
}
interface Params {
  contaIds: string,
  dtInicio: string,
  dtFim: string
}

@Component({
  selector: 'app-simular',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './simular.component.html',
  styleUrl: './simular.component.scss'
})
export class SimularComponent implements OnInit {
  constructor(private readonly api: ApiService) { }

  public contas: ContaOutput[] = [];
  public transacoesPorConta: ContaTransacoes[] = [];

  public totalEntradas = 0;
  public totalSaidas = 0;
  public totalSaldo = 0;

  meses: number[] = [1, 2, 3, 4, 5, 6];
  selectedMes: number | null = null;
  params: Params = {
    dtInicio: '',
    dtFim: '',
    contaIds: ''
  }

  ngOnInit() {
    this.api.getContas('').subscribe((contas) => {
      this.contas = contas;
      this.populate();
    });
  }

  selecionarMes(mes: number): void {
    this.selectedMes = mes;
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();

    const dtInicio = new Date(anoAtual, hoje.getMonth(), 1);
    const dtFim = new Date(anoAtual, hoje.getMonth() + mes, 0);

    this.params.dtInicio = formatDate(dtInicio, 'yyyy-MM-ddT00:00:00', 'en-US');
    this.params.dtFim = formatDate(dtFim, 'yyyy-MM-ddT00:00:00', 'en-US');

    this.populate();
  }


  populate() {

    const transacoesRequests = this.contas.map((conta) => {

      this.params.contaIds = conta.id.toString();

      return this.api.getTransacoes(this.params).pipe(
        map((transacoes: TransacaoOutput[]) => ({
          conta,
          entradas: transacoes
            .filter((t) => t.tipo === 'ENTRADA')
            .reduce((sum, t) => sum + Number(t.valor), 0),
          saidas: transacoes
            .filter((t) => t.tipo === 'SAIDA')
            .reduce((sum, t) => sum + Number(t.valor), 0),
        }))
      );
    });

    forkJoin(transacoesRequests).subscribe((resultados) => {
      this.transacoesPorConta = resultados.map((r) => ({
        conta: r.conta,
        entradas: r.entradas,
        saidas: r.saidas,
        saldo: r.entradas - r.saidas,
      }));

      this.calculateTotals();
    });
  }

  calculateTotals() {
    this.totalEntradas = this.transacoesPorConta.reduce((sum, t) => sum + t.entradas, 0);
    this.totalSaidas = this.transacoesPorConta.reduce((sum, t) => sum + t.saidas, 0);
    this.totalSaldo = this.transacoesPorConta.reduce((sum, t) => sum + t.saldo, 0);
  }
}
