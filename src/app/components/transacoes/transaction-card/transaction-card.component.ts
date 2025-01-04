import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Transacao } from '../../../shared/model/lancamento/model/lancamento.model';

@Component({
    selector: 'app-transaction-card',
    imports: [CommonModule],
    templateUrl: './transaction-card.component.html',
    styleUrl: './transaction-card.component.scss'
})
export class TransactionCardComponent {
  @Input() transaction!: Transacao;
}
