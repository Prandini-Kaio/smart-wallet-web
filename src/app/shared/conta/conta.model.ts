export interface ContaOutput {
    id: number;
    banco: string;
    nome: string;
    dtVencimento: string;
    tipoConta: string;
    saldoParcial: number;
    color: string;
}

export interface ContaFilter {
    nome: string,
    banco: string,
    tipoConta: string,
    diaVencimento: string
}

export interface TipoContaOutput {
    nome: string;
    descricao: string;
}