import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Transacao } from '../../shared/lancamento/model/lancamento.model';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.scss'
})
export class TransactionCardComponent {
  @Input() transaction!: Transacao;
}
