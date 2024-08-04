import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private accountService = inject(AccountService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = new FormGroup({
    username: new FormGroup({}),
    password: new FormGroup({})
  });
  submitted = false;
  loading = false;


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }


  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.accountService.login(this.loginForm.value).subscribe({
      next: () => {
        this.accountService.getUserInfo().subscribe({
          next: () => {
            this.router.navigateByUrl('/home');
          },
          error: () => this.loading = false
        },
        );
      },
      error: () => this.loading = false
    });
  }
}
