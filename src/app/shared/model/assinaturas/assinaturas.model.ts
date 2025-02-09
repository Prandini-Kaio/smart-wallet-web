import {ContaOutput} from "../conta/conta.model";

export interface AssinaturaOutput {
  id: number,
  contaDestino: ContaOutput,
  contaOrigem: ContaOutput,
  valor: number,
  dtInicio: string,
  dtFim: string,
  ativa: boolean,
  descricao: string,
}
