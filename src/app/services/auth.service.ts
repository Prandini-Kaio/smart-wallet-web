import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';

export interface IUsuario {
  id: string;
  email: string;
  senha: string;
}

export interface IAuthResponse {
  sucesso: boolean;
  usuario: IUsuario;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(usuario: IUsuario): Observable<IAuthResponse> {
    return this.mockUser(usuario).pipe(tap((rsp) => {
      if (!rsp.sucesso) return;
      localStorage.setItem('token', btoa(rsp.token || ''));
      localStorage.setItem('usuario', btoa(JSON.stringify(usuario)));
      this.router.navigate(['']);
    }));
  }

  private mockUser(usuario: IUsuario): Observable<IAuthResponse> {
    let retornoMock: IAuthResponse = {
      sucesso: false,
      usuario
    };

    if (usuario.email === 'hello@balta.io' && usuario.senha === '123') {
      retornoMock = {
        sucesso: true,
        usuario,
        token: 'TokenQueSeriaGeradoPelaAPI'
      };
    }

    return of(retornoMock);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get obterUsuarioLogado(): IUsuario | null {
    const user = localStorage.getItem('usuario');
    return user ? JSON.parse(atob(user)) : null;
  }

  get obterIdUsuarioLogado(): string | null {
    const usuario = this.obterUsuarioLogado;
    return usuario ? usuario.id : null;
  }

  get obterTokenUsuario(): string | null {
    const token = localStorage.getItem('token');
    return token ? atob(token) : null;
  }

  get logado(): boolean {
    return !!this.obterTokenUsuario;
  }
}
