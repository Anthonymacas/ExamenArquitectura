import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-no-encontrado',
  templateUrl: './no-encontrado.component.html',
  styleUrls: [],
})
export class NoEncontradoComponent {
  constructor(public app: AppComponent, private router: Router) {}

  redirigir() {
    window.location.href = '/';
  }
}
