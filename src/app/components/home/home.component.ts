import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { SnackbarService } from '../../services/snackbar.service';
import { UserDetailsComponent } from '../user-details/user-details.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  snackbar = inject(SnackbarService);
  usersService = inject(UsersService);
  dialog = inject(MatDialog);
  displayedColumns: string[] = ['id', 'name', 'username', 'lastLoginDate', 'isBlocked', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  pageSize = 5;
  pageIndex = 0;
  totalUsers = 0;
  searchValue = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.loadUsers();
    });
  }

  loadUsers(searchString: string = '') {
    if (searchString !== '') {
      this.pageIndex = 0;
    }

    this.usersService.getUsers(searchString, this.pageIndex + 1, this.pageSize).subscribe({
      next: response => {
        this.dataSource.data = response.items;
        this.totalUsers = response.count;
      },
      error: () => {
        this.snackbar.error('Error fetching users');
      }
    });
  }

  openUserDialog(userId: string | null = null): void {
    if (userId) {
      this.usersService.getUserById(userId).subscribe({
        next: (response) => {
          const dialogRef = this.dialog.open(UserDetailsComponent, {
            width: '820px',
            data: { user: response, isEdit: true }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.usersService.updateUser(userId, result).subscribe({
                next: (user) => {
                  this.snackbar.success('User updated successfully');
                  this.updateUserInList(user);
                },
                error: () => {
                  this.snackbar.error('Error updating user');
                }
              });
            }
          });
        },
        error: () => {
          this.snackbar.error('Error fetching user');
        }
      });
    } else {
      const dialogRef = this.dialog.open(UserDetailsComponent, {
        width: '800px',
        data: { user: null, isEdit: false }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.usersService.addUser(result).subscribe({
            next: (user) => {
              this.snackbar.success('User added successfully');
              this.dataSource.data.push(user);
              this.totalUsers++;
            },
            error: () => {
              this.snackbar.error('Error adding user');
            }
          });
        }
      });
    }
  }

  blockUser(user: User): void {
    const newStatus = !user.isBlocked;

    this.usersService.blockUser(user.id, newStatus).subscribe({
      next: (user) => {
        this.snackbar.success('User status changed successfully');
        this.updateUserInList(user);
      },
      error: () => {
        this.snackbar.error('Error changing user status');
      }
    });

  }


  private updateUserInList(updatedUser: User): void {
    const index = this.dataSource.data.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.dataSource.data[index] = updatedUser;
      this.dataSource._updateChangeSubscription();
    }
  }
}
