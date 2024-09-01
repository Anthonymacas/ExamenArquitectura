import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  usuario: string = '';
  clave: string = '';

  constructor(private authService: LoginService, private router: Router) {}

  login(): void {
    this.authService.login(this.usuario, this.clave).subscribe((success) => {
      if (success) {
        this.router.navigate(['/proyectos']);
      } else {
        alert('Inicio Sesión Fallido');
      }
    });
  }
}
