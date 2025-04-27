import { Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignOutComponent } from './modules/auth/sign-out/sign-out.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { OtherComponent } from './modules/pages/other/other.component';
import { loginGuard } from './core/guards/login.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Root redirect
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  
  // Auth
  { 
    path: 'sign-in', 
    component: SignInComponent,
    canActivate: [loginGuard]
  },
  { path: 'sign-out', component: SignOutComponent },

  // Dashboard
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      // Catalogos
      { path: 'home', component: HomeComponent },
      { path: 'other', component: OtherComponent },
      { path: '**', redirectTo: 'home' },
    ],
  },

  // Catch all route - must be last
  { path: '**', redirectTo: 'sign-in' },
];
