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

  email: string = 'henderson.briggs@geeknet.net';
  password: string = '23derd*334';

  signIn() {
    const params = {
      email: this.email,
      password: this.password
    };
    this.#authService.login(params).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response));
        const randomToken = crypto.randomUUID();
        localStorage.setItem('token', randomToken);
        this.#router.navigate(['/dashboard/home']);
      },
      error: (error) => {
        console.error('Login failed');
      }
    });
  }
}
