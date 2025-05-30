import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    // If user is not logged in, redirect to sign-in
    router.navigate(['/sign-in']);
    return false;
  }
  // Allow access only if user is authenticated
  return true;
};
