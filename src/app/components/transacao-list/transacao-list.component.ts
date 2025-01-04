import {Component, Input, OnInit} from '@angular/core';
import {TransacaoItemComponent} from "../transacao-item/transacao-item.component";
import {CommonModule} from '@angular/common';
import {LancamentoOutput, Totalizador, TransacaoOutput} from '../../shared/model/lancamento/model/lancamento.model';
import {ApiService} from '../../services/api.service';
import {LancamentoFilterComponent} from "../lancamentos/components/lancamento-filter/lancamento-filter.component";
import {TransacaoFilterComponent} from "../transacao-filter/transacao-filter.component";
import {ToastrService} from "../../shared/services/toastr.service";

@Component({
    selector: 'app-transacao-list',
    imports: [CommonModule, TransacaoItemComponent, LancamentoFilterComponent, TransacaoFilterComponent],
    templateUrl: './transacao-list.component.html',
    styleUrl: './transacao-list.component.scss'
})
export class TransacaoListComponent implements OnInit{
  @Input() lancamento!: LancamentoOutput;


  transacoes: TransacaoOutput[] = [];
  totalizador: Totalizador = {
    totalEntrada: 0,
    totalSaida: 0,
    total: 0
  };

  constructor(private readonly api: ApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.api.getTransacoes({}).subscribe((response => {
      this.transacoes = response;
    }));

    this.applyFilters({});
  }

  applyFilters(filters: any){
    this.api.getTransacoes(filters).subscribe(
      (data) => {
        this.transacoes = data;
      }
    );

    this.api.getTotalizadorTransacoes(filters).subscribe(response => {
      this.totalizador = response;
    });
  }

  editTransacao(transacao: TransacaoOutput): void{

  }

  payTransacao(transacao: TransacaoOutput): void {

    const data = {
      id: transacao.id
    }

    this.api.payTransacao(data).subscribe((data) => {
      this.toastr.success("Transação paga com sucesso!", 3000);
    });

    // window.location.reload();
  }
}
