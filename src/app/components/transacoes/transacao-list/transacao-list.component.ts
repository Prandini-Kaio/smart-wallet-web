import {Component, Input, OnInit} from '@angular/core';
import {TransacaoItemComponent} from "../transacao-item/transacao-item.component";
import {CommonModule} from '@angular/common';
import {LancamentoOutput, Totalizador, TransacaoOutput} from '../../../shared/model/lancamento/model/lancamento.model';
import {ApiService} from '../../../services/api.service';
import {LancamentoFilterComponent} from "../../lancamentos/components/lancamento-filter/lancamento-filter.component";
import {TransacaoFilterComponent} from "../transacao-filter/transacao-filter.component";
import {ToastrService} from "../../../shared/services/toastr.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ContaOutput} from "../../../shared/model/conta/conta.model";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";

@Component({
    selector: 'app-transacao-list',
    imports: [
      CommonModule,
      MatSelectModule,
      TransacaoItemComponent,
      LancamentoFilterComponent,
      TransacaoFilterComponent,
      MatProgressSpinner,
      MatButtonModule,
      MatTableModule,
      MatDialogModule,
      MatIconModule,
      MatCheckboxModule
    ],
    templateUrl: './transacao-list.component.html',
    styleUrl: './transacao-list.component.scss'
})
export class TransacaoListComponent implements OnInit{
  @Input() lancamento!: LancamentoOutput;


  constructor(private readonly api: ApiService, private toastr: ToastrService) { }

  public displayedColumns: string[] = ['select', 'descricao', 'status', 'vencimento', 'valor', 'acoes'];

  public transacoes: TransacaoOutput[] = [];
  public transacaoSelecionada: TransacaoOutput | null = null;
  public transacoesSelecionadas: Array<TransacaoOutput> = [];

  public contas: Array<ContaOutput> = [];
  public contaVazia: ContaOutput = {
    id: 0,
    banco: "",
    nome: "",
    color: "",
    dtFechamento: "",
    dtVencimento: "",
    saldoDisponivel: 0,
    saldoPendente: 0,
    tipoConta: "",
  };
  public contaSelecionada: ContaOutput = this.contaVazia;

  public showPayModal = false;
  public loading = true;

  ngOnInit() {

    this.api.getContas({}).subscribe((response) => {
      this.contas = response;
    });

    this.api.getTransacoes({}).subscribe((response => {
      this.transacoes = response;
    }));

    this.applyFilters({});
  }

  applyFilters(filters: any){
    this.loading = true;
    this.api.getTransacoes(filters).subscribe(
      (data) => {
        this.transacoes = data;
      }
    );
    this.loading = false;
  }

  toggleAll(selecionado: boolean) {
    if (selecionado) {
      this.transacoesSelecionadas = [...this.transacoes]; // Seleciona todas
    } else {
      this.transacoesSelecionadas = []; // Limpa a seleção
    }
  }


  toggleSelection(transacao: TransacaoOutput) {
    const index = this.transacoesSelecionadas.findIndex(t => t.id === transacao.id);

    if (index === -1) {
      this.transacoesSelecionadas.push(transacao);
    } else {
      this.transacoesSelecionadas.splice(index, 1);
    }
  }

  openPayModal(): void {
    this.showPayModal = !this.showPayModal;
  }

  closePayModal() {
    this.showPayModal = !this.showPayModal;
  }

  editTransacao(transacao: TransacaoOutput): void{

  }

  payTransacao(transacao: TransacaoOutput | null): void {

    const data = {
      ids: [transacao?.id],
      contaDestinoId: this.contaSelecionada.id
    }

    this.api.pagarTransacao(data).subscribe((data) => {
      this.toastr.success("Transação paga com sucesso!", 3000);
    });

    // window.location.reload();
  }

  payTransacoes() {
    // Se houver transações selecionadas
    if (this.transacoesSelecionadas.length > 0) {

      // Criação do array com os IDs das transações selecionadas
      const tIds = this.transacoesSelecionadas.map(t => t.id);

      // Criando o objeto de dados para a requisição
      const data = {
        ids: tIds, // Passando todos os IDs
        contaDestinoId: this.contaSelecionada.id
      };

      // Chamando a API para pagar as transações
      this.api.pagarTransacao(data).subscribe(response => {
        this.toastr.success("Transações pagas com sucesso!", 3000);
          this.transacoesSelecionadas = [];
        });
    }
  }

}
