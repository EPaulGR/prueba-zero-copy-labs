import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  imports: [FormsModule],
  standalone: true
})
export class SignInComponent {
  #router = inject(Router);
  #authService = inject(AuthService);

  username: string = '';
  password: string = '';

  signIn() {
    if (this.#authService.login(this.username, this.password)) {
      this.#router.navigate(['/home']);
    } else {
      // Handle login error
      console.error('Login failed');
    }
  }
}
