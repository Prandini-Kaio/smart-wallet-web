import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ContaOutput, TipoContaOutput } from '../shared/conta/conta.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLancamento(paramsObj: any): Observable<any> {

    let params = new HttpParams();

    for(const key in paramsObj){
      if(paramsObj.hasOwnProperty(key)){
        params = params.append(key, paramsObj[key]);
      }
    }

    return this.http.get(`${this.apiUrl}/lancamento`, { params });
  }

  createLancamento(input: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/lancamento`, input);
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

  getContas(paramObj: any): Observable<string[]> {
    let params = new HttpParams();

    for(const key in paramObj){
      if(paramObj.hasOwnProperty(key)){
        params = params.append(key, paramObj[key]);
      }
    }

    return this.http.get<string[]>(`${this.apiUrl}/conta`, { params });
  }

  createConta(input: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/conta`, input);
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
  
}
