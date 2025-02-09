import {CommonModule, formatDate} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiService} from '../../services/api.service';
import {ContaOutput} from '../../shared/model/conta/conta.model';
import {LancamentoOutput, SaldoProjetado, TransacaoOutput,} from '../../shared/model/lancamento/model/lancamento.model';
import {FormLancamentoComponent} from '../lancamentos/components/form-lancamento/form-lancamento.component';
import {TransacaoFilterComponent} from '../transacoes/transacao-filter/transacao-filter.component';
import {ToastrService} from "../../shared/services/toastr.service";

interface ContaTransacoes {
  conta: ContaOutput;
  entradas: number;
  saidas: number;
  saldo: number;
}
interface Params {
  contaIds: string;
  dtInicio: string;
  dtFim: string;
}

@Component({
    selector: 'app-simular',
    imports: [CommonModule, FormLancamentoComponent, TransacaoFilterComponent],
    templateUrl: './simular.component.html',
    styleUrl: './simular.component.scss'
})
export class SimularComponent implements OnInit {
  constructor(
    private readonly api: ApiService,
    private readonly toastr: ToastrService
  ) {}

  public contas: ContaOutput[] = [];
  public transacoesPorConta: ContaTransacoes[] = [];

  public totalEntradas = 0;
  public totalSaidas = 0;
  public totalSaldo = 0;

  protected meses: number[] = [1, 2, 3, 4, 5, 6];
  protected selectedMes: number | null = null;
  public params: Params = {
    dtInicio: '',
    dtFim: '',
    contaIds: '',
  };

  public transacoes: TransacaoOutput[] = [];
  public lancamentos: LancamentoOutput[] = [];
  public saldoProjetados: SaldoProjetado[] = [];

  protected showModal = false;

  criarLancamento(data: any) {
    this.api.createMockLancamento(data).subscribe((lancamento) => {
      this.lancamentos.push(lancamento);
      this.toastr.success('Lancamento criado com sucesso!', 3000);
    });
  }

  openModal() {
    this.showModal = !this.showModal;
  }

  calcularTotalLancamentos(): number {
    return this.lancamentos.reduce((total, lancamento) => {
      if (lancamento.tipoLancamento === 'Entrada') {
        return total + lancamento.valor;
      } else if (lancamento.tipoLancamento === 'Saída') {
        return total - lancamento.valor;
      }
      return total;
    }, 0);
  }

  onApplyFilters(filters: any) {
    this.api.getSaldoProjetado(filters).subscribe((data) => {
      this.saldoProjetados = data;
    });
  }

  ngOnInit() {
    this.api.getContas('').subscribe((contas) => {
      this.contas = contas;
      this.populate();
    });

    this.api.getTransacoes('').subscribe((data) => {
      this.transacoes = data;
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
    this.populateLancamentos();
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

  populateLancamentos() {
    const param = {
      contaIds: this.contas.map((c) => c.id).join(', '),
      dtInicio: this.params.dtInicio,
      dtFim: this.params.dtFim,
    };

    this.api.getTransacoes(param).subscribe((data) => {
      this.transacoes = data;
    });
  }

  calculateTotals() {
    this.totalEntradas = this.transacoesPorConta.reduce(
      (sum, t) => sum + t.entradas,
      0
    );
    this.totalSaidas = this.transacoesPorConta.reduce(
      (sum, t) => sum + t.saidas,
      0
    );
    this.totalSaldo = this.transacoesPorConta.reduce(
      (sum, t) => sum + t.saldo,
      0
    );
  }
}
