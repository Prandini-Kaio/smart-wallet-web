import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Transacao } from '../../shared/lancamento/model/lancamento.model';
import { LancamentoHeaderComponent } from "../lancamento-header/lancamento-header.component";
import { TransactionCardComponent } from "../transaction-card/transaction-card.component";

@Component({
  selector: 'app-lancamento-details',
  standalone: true,
  imports: [
    CommonModule,
    TransactionCardComponent, 
    LancamentoHeaderComponent
  ],
  templateUrl: './lancamento-details.component.html',
  styleUrl: './lancamento-details.component.scss'
})
export class LancamentoDetailsComponent implements OnInit {
  transacoes: Transacao[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private readonly _api: ApiService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    
    if(id){
      this.fetch(id);
    }
  }

  fetch(id: string): void {
    this._api.getTransacoes({ idLancamento: id }).subscribe(
      (response) =>{
        this.transacoes = response;
      },
      (error) => {
        this.error = error.message;
        this.loading = false;
      }
    )
    this.loading = false;
  }

  goBack() {
    // Implement navigation logic
  }

  editLancamento() {
    // Implement edit logic
  }
}
