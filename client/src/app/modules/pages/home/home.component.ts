import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { HomeService } from './home.service';
import { User } from '../../../core/models/user.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class HomeComponent implements OnInit {
  
  viewBalance = signal<boolean>(true);
  user = signal<User>({} as User);
  userEdit = signal<boolean>(false);
  userForm: FormGroup;
  
  #homeService = inject(HomeService);
  #formBuilder = inject(FormBuilder);

  constructor() {
    this.userForm = this.#formBuilder.group({
      name: this.#formBuilder.group({
        first: [''],
        last: ['']
      }),
      age: [''],
      email: [''],
      phone: [''],
      address: [''],
      company: ['']
    });
  }
  
  listenUser = effect(() => {
    if(this.user()) {
      this.userForm.patchValue(this.user());
    }
  });
 
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.user.set(JSON.parse(user));
      this.getUser();
    }
  }

  getUser(): void {
    this.#homeService.getUser(this.user()._id).subscribe({
      next: (user: User) => {
        console.log(user);
        this.user.set(user);
        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  selectBalance(): void {
    this.viewBalance.set(true);
  }

  selectProfile(): void {
    this.viewBalance.set(false);
  }

  editUser(): void {
    this.userEdit.update(value => !value);
  }

  updateUser(): void {
    this.#homeService.updateUser(this.user()._id, this.userForm.value).subscribe({
      next: (user: User) => {
        console.log(user);
        alert('User updated');
        this.user.set(user);
      }
    });
  }
}
