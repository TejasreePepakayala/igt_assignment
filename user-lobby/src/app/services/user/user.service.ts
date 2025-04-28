import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../Model/User.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://gorest.co.in/public-api/users';
  query = '';

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1): Observable<{ data: User[] }> {
    console.log(
      this.baseUrl + '?page=' + page + '&per_page=' + 10 + this.query
    );
    return this.http.get<{ data: User[] }>(
      this.baseUrl + '?page=' + page + '&per_page=' + 10 + this.query
    );
  }

  buildCondition(event: any) {
    this.query = `&${event.type}=${event.value}`;
  }
}
