import { Component, ViewChild } from '@angular/core';
import { LoginService } from './servicios/login.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(public loginService: LoginService, private router: Router) {}

  title = 'conjuntaFront';
  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
