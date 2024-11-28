import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LancamentoOutput, TransacaoOutput } from '../../shared/lancamento/model/lancamento.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transacao-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transacao-item.component.html',
  styleUrl: './transacao-item.component.scss'
})
export class TransacaoItemComponent{
  @Input() transacao!: TransacaoOutput;
  @Input() lancamento!: LancamentoOutput;
  @Output() edit = new EventEmitter<TransacaoOutput>();
  @Output() delete = new EventEmitter<number>();

  onEdit(){
    this.edit.emit(this.transacao);
  }

  onDelete(){
    this.delete.emit(this.transacao.id);
  }

  getStatusClass(status: string): string {
    console.log(status)
    return `status--${status.toLowerCase()}`;
  }
}
