import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddLancamentoRepository {

  constructor(private readonly _http: HttpClient) { }

  fetchCategorias(): Observable<any> {
    return this._http.get<string[]>(`http://localhost:8080/api/v1/lancamento`);
  }
}
