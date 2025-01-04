import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LancamentoOutput, TransacaoOutput} from '../../../shared/model/lancamento/model/lancamento.model';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-transacao-item',
    imports: [CommonModule],
    templateUrl: './transacao-item.component.html',
    styleUrl: './transacao-item.component.scss'
})
export class TransacaoItemComponent{
  @Input() transacao!: TransacaoOutput;
  @Input() lancamento!: LancamentoOutput;
  @Output() edit = new EventEmitter<TransacaoOutput>();
  @Output() pay = new EventEmitter<TransacaoOutput>();

  onEdit(){
    this.edit.emit(this.transacao);
  }

  onPay(){
    this.pay.emit(this.transacao);
  }

  getStatusClass(status: string): string {
    return `status--${status.toLowerCase()}`;
  }
}
