import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';



import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { SnackbarService } from '../../services/snackbar.service';
import { MatButtonModule } from '@angular/material/button';


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
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  snackbar = inject(SnackbarService);
  usersService = inject(UsersService);
  displayedColumns: string[] = ['id', 'name', 'username', 'lastLoginDate'];
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


}
