import {ContaOutput} from "../../../../shared/model/conta/conta.model";

export interface FluxoCaixaOutput {
  saldoAnterior: number,
  entradas: number,
  saidas: number,
  saldoProjetado: number,
  lancamentos: LancamentosProjetadosOutput[]
}

export interface LancamentosProjetadosOutput {
  conta: ContaOutput,
  categoria: string,
  dtVencimento: string,
  descricao: string,
  status: string,
  entradas: number,
  saidas: number
}
