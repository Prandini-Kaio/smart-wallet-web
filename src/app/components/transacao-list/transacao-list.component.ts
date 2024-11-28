import { Component, Input, Output } from '@angular/core';
import { TransacaoItemComponent } from "../transacao-item/transacao-item.component";
import { CommonModule } from '@angular/common';
import { LancamentoOutput, TransacaoOutput } from '../../shared/lancamento/model/lancamento.model';

@Component({
  selector: 'app-transacao-list',
  standalone: true,
  imports: [CommonModule, TransacaoItemComponent],
  templateUrl: './transacao-list.component.html',
  styleUrl: './transacao-list.component.scss'
})
export class TransacaoListComponent {
  @Input() lancamento!: LancamentoOutput;
  @Input() transacoes!: TransacaoOutput[];

  editTransacao(transacao: TransacaoOutput): void{

  }

  deleteTransacao(id: number): void{

  }
}
