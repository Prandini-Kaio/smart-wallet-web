import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor( private authService: AuthService, private router: Router ) {}


  onSubmit(){
    const sucess = this.authService.login({
      id: '',
      email: 'admin',
      senha: 'admin'
    });
    if(sucess){
      this.router.navigate(['/home']);
    }else{
      this.error = 'Credenciais inválidas';
    }
  }
}
