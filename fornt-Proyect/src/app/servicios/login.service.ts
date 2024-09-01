import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private fakeToken = 'fake-jwt-token';

  constructor() {}

  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('authToken', this.fakeToken);
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
