import { Component, Input, OnInit, Output } from '@angular/core';
import { TransacaoItemComponent } from "../transacao-item/transacao-item.component";
import { CommonModule } from '@angular/common';
import { LancamentoOutput, Totalizador, TransacaoOutput } from '../../shared/lancamento/model/lancamento.model';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { LancamentoFilterComponent } from "../lancamento-filter/lancamento-filter.component";
import { TransacaoFilterComponent } from "../transacao-filter/transacao-filter.component";

@Component({
  selector: 'app-transacao-list',
  standalone: true,
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

  constructor(private readonly api: ApiService, toastr: ToastrService) { }

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

  deleteTransacao(id: number): void{

  }
}
