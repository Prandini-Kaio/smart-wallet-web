import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LancamentoOutput } from '../../../../shared/model/lancamento/model/lancamento.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lancamento-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './lancamento-item.component.html',
  styleUrl: './lancamento-item.component.scss'
})
export class LancamentoItemComponent {
  @Input() lancamento!: LancamentoOutput;
  @Output() edit = new EventEmitter<LancamentoOutput>();
  @Output() delete = new EventEmitter<LancamentoOutput>();
  @Output() copy = new EventEmitter<LancamentoOutput>();

  onEdit() {
    this.edit.emit(this.lancamento);
  }

  onDelete(){
    this.delete.emit(this.lancamento);
  }

  onCopy(){
    this.copy.emit(this.lancamento)
  }

  convertData(date: string): string{
    if (!date) {
      return ''; // Retorna uma string vazia se a data não for válida
  }

  const d = new Date(date);

  // Verifica se a data é válida
  if (isNaN(d.getTime())) {
      return ''; // Retorna uma string vazia se a data não for válida
  }

  return d.toISOString().split('T')[0];
  }
}
