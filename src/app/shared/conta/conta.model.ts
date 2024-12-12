export interface ContaOutput {
    id: number;
    banco: string;
    nome: string;
    dtVencimento: string;
    tipoConta: string;
    saldoParcial: number;
    color: string;
}

export interface TipoContaOutput {
    nome: string;
    descricao: string;
}