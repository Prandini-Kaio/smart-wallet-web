import { Injectable } from '@angular/core';
import { LancamentoOutput } from '../../../shared/lancamento/model/lancamento.model';

@Injectable({
  providedIn: 'root'
})
export class LancamentoServiceService {

  private lancamento?: LancamentoOutput;

  constructor() { }

  setLancamento(lancamento: LancamentoOutput) {
    this.lancamento = lancamento;
  }

  getLancamento(): LancamentoOutput | undefined{
    return this.lancamento;
  }

  clear() {
    this.lancamento = undefined;
  }
}
