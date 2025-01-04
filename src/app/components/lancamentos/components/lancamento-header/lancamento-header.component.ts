import { Component, Input } from '@angular/core';
import { Lancamento } from '../../../../shared/model/lancamento/model/lancamento.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-lancamento-header',
    imports: [CommonModule],
    templateUrl: './lancamento-header.component.html',
    styleUrl: './lancamento-header.component.scss'
})
export class LancamentoHeaderComponent {
  @Input() lancamento!: Lancamento;
}
