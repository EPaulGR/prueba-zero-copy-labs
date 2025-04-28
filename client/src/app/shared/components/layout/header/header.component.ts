import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [
    RouterModule,
    CommonModule,
  ],
})
export class HeaderComponent {

  #router = inject(Router);
  #authService = inject(AuthService);

  router = signal<string[]>([ 
    'home',
    // 'other',
  ]);

  isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update(isOpen => !isOpen);
  }

  signOut(): void {
    this.#authService.logout();
  }
}
