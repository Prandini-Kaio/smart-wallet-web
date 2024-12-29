import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Orcamento } from '../../../../../shared/orcamento/orcamento.model';
import { OrcamentoItemComponent } from "../orcamento-item/orcamento-item.component";



@Component({
  selector: 'app-orcamento-chart',
  standalone: true,
  imports: [
    CommonModule,
    OrcamentoItemComponent
],
  templateUrl: './orcamento-chart.component.html',
  styleUrl: './orcamento-chart.component.scss'
})
export class OrcamentoChartComponent {
  @Input() orcamentos: Orcamento[] = []
}
