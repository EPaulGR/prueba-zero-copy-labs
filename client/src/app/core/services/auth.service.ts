import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = signal<boolean>(false);

  constructor(private router: Router) {
    // Check if there's a token in localStorage on service initialization
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated.set(true);
    }
  }

  login(username: string, password: string): boolean {
    // Here you would typically make an API call to validate credentials
    // For now, we'll just simulate a successful login
    if (username && password) {
      localStorage.setItem('token', 'dummy-token');
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
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