import {ContaOutput} from "../conta/conta.model";

export interface AssinaturaOutput {
  id: number,
  conta: ContaOutput,
  valor: number,
  dtInicio: string,
  dtFim: string,
  ativa: boolean,
  descricao: string,
}
