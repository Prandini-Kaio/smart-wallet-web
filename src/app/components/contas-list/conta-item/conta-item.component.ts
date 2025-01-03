import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContaOutput } from '../../../shared/model/conta/conta.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conta-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './conta-item.component.html',
  styleUrl: './conta-item.component.scss'
})
export class ContaItemComponent {
  @Input() conta!: ContaOutput;
  @Output() edit = new EventEmitter<ContaOutput>;
  @Output() delete = new EventEmitter<ContaOutput>;

  public showConfirmationModal = false;

  editar() {
    this.edit.emit(this.conta);
  }

  deletar() {
    this.delete.emit(this.conta);
  }

  showModal(){
    this.showConfirmationModal = !this.showConfirmationModal;
  }
}
