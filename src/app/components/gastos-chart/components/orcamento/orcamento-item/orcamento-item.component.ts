import { Component, Input } from '@angular/core';
import { Orcamento } from '../../../../../shared/model/orcamento/orcamento.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-orcamento-item',
    imports: [
        CommonModule
    ],
    templateUrl: './orcamento-item.component.html',
    styleUrl: './orcamento-item.component.scss'
})
export class OrcamentoItemComponent {
  @Input() orcamento!: Orcamento;

  getProgresso(): number {
    return (this.orcamento.gastoAtual / this.orcamento.limite) * 100;
  }

  getBarColor(): string {
    const progresso = this.getProgresso();
    if (progresso <= 50) {
      return '#038544';
    } else if (progresso <= 80) {
      return '#ebcc1c';
    } else {
      return '#921e1e';
    }
  }
}
