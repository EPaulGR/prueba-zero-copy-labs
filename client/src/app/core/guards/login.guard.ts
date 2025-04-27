import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // If user is already logged in, redirect to dashboard home
    router.navigate(['/dashboard/home']);
    return false;
  }

  // Allow access to login page only if user is not authenticated
  return true;
}; 