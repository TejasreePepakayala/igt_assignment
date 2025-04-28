import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatLabel } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../services/user/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-user-search',
  imports: [
    MatIcon,
    CommonModule,
    FormsModule,
    MatLabel,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss',
})
export class UserSearchComponent {
  constructor(private userService: UserService) {}
  searchText = '';

  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<{ type: string; value: string }>();
  @Output() sort = new EventEmitter<'asc' | 'desc'>();

  onSearchChange() {
    this.search.emit(this.searchText);
  }

  filterByGender(gender: string) {
    this.filter.emit({ type: 'gender', value: gender });
  }

  filterByStatus(status: string) {
    this.filter.emit({ type: 'status', value: status });
  }

  sortByName(direction: 'asc' | 'desc') {
    this.sort.emit(direction);
  }

  clearSearch(): void {
    this.searchText = '';
    this.onSearchChange();
  }
  clearFilters(): void {
    this.filter.emit({ type: 'clear', value: '' });
  }
  get isFilterActive(): boolean {
    return this.userService.query !== '';
  }
}
