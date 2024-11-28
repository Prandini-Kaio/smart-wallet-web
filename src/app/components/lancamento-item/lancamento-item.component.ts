import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LancamentoOutput } from '../../shared/lancamento/model/lancamento.model';
import { CommonModule } from '@angular/common';
import { TransacaoItemComponent } from "../transacao-item/transacao-item.component";
import { TransacaoListComponent } from "../transacao-list/transacao-list.component";

@Component({
  selector: 'app-lancamento-item',
  standalone: true,
  imports: [CommonModule, TransacaoItemComponent, TransacaoListComponent],
  templateUrl: './lancamento-item.component.html',
  styleUrl: './lancamento-item.component.scss'
})
export class LancamentoItemComponent {
  @Input() lancamento!: LancamentoOutput;
  @Output() edit = new EventEmitter<LancamentoOutput>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.lancamento);
  }

  onDelete(){
    this.delete.emit(this.lancamento.id);
  }
}
