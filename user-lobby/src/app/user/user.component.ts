import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from '../services/user/user.service';
import { User } from '../../Model/User.model';
import { UserSearchComponent } from '../user-search/user-search.component';

@Component({
  selector: 'app-user',
  imports: [MatCardModule, MatTooltipModule, UserSearchComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  currentPage: number = 1;
  searchText = '';
  filteredUsers: User[] = [];

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}
  users: User[] = [];
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data.data;
      this.filteredUsers = [...this.users];
      this.cdr.detectChanges();
    });
  }

  onLoadMore() {
    this.currentPage++;
    this.userService.getUsers(this.currentPage).subscribe((data) => {
      this.users = [...this.users, ...data.data];
      this.filteredUsers = [...this.users];
      this.applyFilters(this.users);
      this.cdr.detectChanges();
    });
  }

  onSearch(text: string) {
    this.searchText = text;
    this.applyFilters(this.users);
  }

  async onFilterClicked(event: { type: 'gender' | any; value: string }) {
    this.userService.buildCondition(event);
    await this.loadData();
    this.cdr.detectChanges();
    console.log(this.filteredUsers);
    // Open filter dialog or show options
  }

  onSortClicked(event: any) {
    this.filteredUsers = [...this.filteredUsers].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (event === 'asc') {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else {
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      }
    });
  }

  applyFilters(users: User[]) {
    if (this.searchText) {
      this.filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredUsers = [...users];
    }
  }
}
