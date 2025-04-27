import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = signal<boolean>(false);
  #http = inject(HttpClient);
  apiUrl = environment.apiURL;

  constructor(private router: Router) {
    // Check if there's a token in localStorage on service initialization
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated.set(true);
    }
  }

  login(params: any): Observable<any> {
    this.isAuthenticated.set(true);
    return this.#http.post<any>(`${this.apiUrl}/users/login`, params);
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.router.navigate(['/sign-in']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}