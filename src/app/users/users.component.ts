import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  totalUsers = 0;
  pageSize = 6;
  searchControl = new FormControl('');
  userFound = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUsers(1);

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      if (searchTerm) {
        this.userService.getUser(parseInt(searchTerm)).subscribe(
          user => {
            this.users = [user];
            this.totalUsers = 1;
            this.userFound = true;
          },
          error => {
            this.users = [];
            this.totalUsers = 0;
            this.userFound = false;
          }
        );
      } else {
        this.getUsers(1);
        this.userFound = true;
      }
    });
  }


  getUsers(page: number): void {
    this.userService.getUsers(page).subscribe(response => {
      this.users = response.data;
      this.totalUsers = response.total;
    });
  }

  gotoDetails(id: number): void {
    this.router.navigate(['/user', id]);
  }

  changePage(event: any): void {
    this.getUsers(event.pageIndex + 1);
  }
}
