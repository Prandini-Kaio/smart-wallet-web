import { Component, Input } from '@angular/core';
import { Orcamento } from '../../../../../shared/orcamento/orcamento.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orcamento-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './orcamento-item.component.html',
  styleUrl: './orcamento-item.component.scss',
})
export class OrcamentoItemComponent {
  @Input() orcamento!: Orcamento;

  getProgresso(): number {
    return (this.orcamento.gastoAtual / this.orcamento.limite) * 100;
  }

  getBackgroundColor(): string {
    const progresso = this.getProgresso();
    if (progresso <= 50) {
      return '#d4e8d4'; // Tons pastéis para valores baixos
    } else if (progresso <= 80) {
      return '#ffe6b3'; // Tons médios
    } else {
      return '#f8d7da'; // Tons fortes para valores altos
    }
  }

  getBarColor(): string {
    const progresso = this.getProgresso();
    if (progresso <= 50) {
      return '#4caf50'; // Verde para valores baixos
    } else if (progresso <= 80) {
      return '#ffc107'; // Amarelo para valores médios
    } else {
      return '#f44336'; // Vermelho para valores altos
    }
  }
}
