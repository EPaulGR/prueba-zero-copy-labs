import { Routes } from '@angular/router';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignOutComponent } from './modules/auth/sign-out/sign-out.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { OtherComponent } from './modules/pages/other/other.component';

export const routes: Routes = [

  // Auth
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-out', component: SignOutComponent },

  // Dashboard
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Catalogos
      { path: 'home', component: HomeComponent },
      { path: 'other', component: OtherComponent },
    ],
  },

];
