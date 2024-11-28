import { Component, Input } from '@angular/core';
import { Lancamento } from '../../shared/lancamento/model/lancamento.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lancamento-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lancamento-header.component.html',
  styleUrl: './lancamento-header.component.scss'
})
export class LancamentoHeaderComponent {
  @Input() lancamento!: Lancamento;
}