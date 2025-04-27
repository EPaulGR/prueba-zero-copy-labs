import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  imports: [],
})
export class SignInComponent {

  #router = inject(Router);

  signIn() {
    this.#router.navigate(['/home']);
  }

}
