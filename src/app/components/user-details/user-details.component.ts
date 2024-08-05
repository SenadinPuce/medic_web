import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userForm!: FormGroup;
  fb = inject(FormBuilder);
  data: { user: User, isEdit: boolean } = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<UserDetailsComponent>);

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [this.data.user?.username || '', this.data.isEdit ? [] : Validators.required],
      password: ['', this.data.isEdit ? [] : [Validators.required]],
      name: [this.data.user?.name || '', Validators.required],
      orders: [this.data.user?.orders || 0, [Validators.required, Validators.min(0), Validators.max(10)]],
      imageUrl: [this.data.user?.imageUrl || '', Validators.required],
      dateOfBirth: [this.data.user?.dateOfBirth || '', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.userForm.value);
  }
}
