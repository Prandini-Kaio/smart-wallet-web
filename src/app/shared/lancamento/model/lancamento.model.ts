export interface Lancamento {
    descricao: string;
    valor: number;
    categoriaLancamento: string;
    tipoLancamento: string;
    tipoPagamento: string;
    conta: string;
    banco: string;
    dtCriacao: string;
    parcelas: number;
    status: string;
}

export interface LancamentoOutput {
    id: number;
    descricao: string;
    valor: number;
    categoriaLancamento: string;
    tipoLancamento: string;
    tipoPagamento: string;
    conta: string;
    banco: string;
    dtCriacao: string;
    parcelas: number;
    status: string;
    icone: string;
    transacoes: TransacaoOutput[];
    expanded?: boolean;
}

export interface TransacaoOutput {
    id: number,
    valor: number,
    status: string,
    dtVencimento: string,
    dtPagamento: string,
    descricao: string;
    descricaoLancamento: string;
}

export interface Transacao {
    lancamento: Lancamento;
    valor: number;
    status: string;
    dtVencimento: string;
    dtPagamento: string;
    descricao: string;
}

export interface Totalizador{
    total: number;
    totalEntrada: number;
    totalSaida: number;
}