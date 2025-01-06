import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';
import {ContaOutput, TipoContaOutput} from '../shared/model/conta/conta.model';
import {ErrorLog} from '../shared/model/monitor-erros/model/monitor-erros.model';
import {LancamentoOutput, TransacaoOutput} from '../shared/model/lancamento/model/lancamento.model';
import {Orcamento} from '../shared/model/orcamento/orcamento.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createConta(input: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/conta`, input);
  }

  createLancamento(input: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/lancamento`, input);
  }

  createMockLancamento(input: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/lancamento/create-input`, input);
  }

  createOrcamento(input: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orcamento`, input);
  }

  getLancamento(paramsObj: any): Observable<any> {

    let params = new HttpParams();

    for(const key in paramsObj){
      if(paramsObj.hasOwnProperty(key)){
        params = params.append(key, paramsObj[key]);
      }
    }

    return this.http.get(`${this.apiUrl}/lancamento`, { params });
  }

  getTransacoes(paramsObj: any): Observable<any> {
    let params = new HttpParams();

    for(const key in paramsObj){
      if(paramsObj.hasOwnProperty(key)){
        params = params.append(key, paramsObj[key]);
      }
    }

    return this.http.get(`${this.apiUrl}/transacao`, { params });
  }

  getTotalizadorTransacoes(paramsObj: any): Observable<any>{
    let params = new HttpParams();

    for(const key in paramsObj){
      if(paramsObj.hasOwnProperty(key)){
        params = params.append(key, paramsObj[key]);
      }
    }

    return this.http.get(`${this.apiUrl}/transacao/totalizador`, { params });
  }

  getSaldoProjetado(paramsObj: any): Observable<any>{
    let params = new HttpParams();

    for(const key in paramsObj){
      if(paramsObj.hasOwnProperty(key)){
        params = params.append(key, paramsObj[key]);
      }
    }

    return this.http.get(`${this.apiUrl}/lancamento/saldo-projetado`, { params });
  }

  getFluxoCaixa(paramsObj: any): Observable<any>{
    let params = new HttpParams();

    for(const key in paramsObj){
      if(paramsObj.hasOwnProperty(key)){
        params = params.append(key, paramsObj[key]);
      }
    }

    return this.http.get(`${this.apiUrl}/fluxo-caixa/projetado`, { params });
  }

  getResumoFinanceiro(paramsObj: any): Observable<any>{
    let params = new HttpParams();

    for(const key in paramsObj){
      if(paramsObj.hasOwnProperty(key)){
        params = params.append(key, paramsObj[key]);
      }
    }

    return this.http.get(`${this.apiUrl}/lancamento/resumo`, { params });
  }

  getContas(paramObj: any): Observable<ContaOutput[]> {
    let params = new HttpParams();

    for(const key in paramObj){
      if(paramObj.hasOwnProperty(key)){
        params = params.append(key, paramObj[key]);
      }
    }

    return this.http.get<ContaOutput[]>(`${this.apiUrl}/conta`, { params });
  }

  getCategoria(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/lancamento/categoria`);
  }


  getAllContas(): Observable<ContaOutput[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conta`);
  }

  getTipoConta(): Observable<TipoContaOutput[]> {
    return this.http.get<TipoContaOutput[]>(`${this.apiUrl}/conta/tipo`);
  }

  getErrors(): Observable<ErrorLog[]> {
    return this.http.get<ErrorLog[]>(`${this.apiUrl}/errors`)
  }

  getOrcamentos(params: any): Observable<Orcamento[]>{
    return this.http.get<Orcamento[]>(`${this.apiUrl}/orcamento`, { params });
  }

  updateConta(input: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/conta`, input);
  }

  updateLancamento(params: any): Observable<LancamentoOutput> {
    return this.http.put<LancamentoOutput>(`${this.apiUrl}/lancamento`, params);
  }

  payTransacao(paramObj: any): Observable<TransacaoOutput> {
    let params = new HttpParams();

    for(const key in paramObj){
      if(paramObj.hasOwnProperty(key)){
        params = params.append(key, paramObj[key]);
      }
    }

    return this.http.put<TransacaoOutput>(`${this.apiUrl}/transacao/pagar`, {}, { params });
  }

  deleteLancamento(paramObj: any): Observable<any> {

    let params = new HttpParams();

    for(const key in paramObj){
      if(paramObj.hasOwnProperty(key)){
        params = params.append(key, paramObj[key]);
      }
    }

    return this.http.delete(`${this.apiUrl}/lancamento`, { params });
  }

  deleteConta(paramObj: any): Observable<any> {

    let params = new HttpParams();

    for(const key in paramObj){
      if(paramObj.hasOwnProperty(key)){
        params = params.append(key, paramObj[key]);
      }
    }

    return this.http.delete(`${this.apiUrl}/conta`, { params });
  }
}
