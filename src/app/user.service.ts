import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'https://reqres.in/api/users';
  private userCache: Record<number, Observable<User>> = {}; 
  private usersCache: Record<number, Observable<any>> = {};

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    if (!this.usersCache[page]) {
      const url = `${this.usersUrl}?page=${page}`;
      this.usersCache[page] = this.http.get<any>(url).pipe(
        shareReplay(1) 
      );
    }
    return this.usersCache[page];
  }

  getUser(id: number): Observable<User> {
    if (!this.userCache[id]) {
      const url = `${this.usersUrl}/${id}`;
      this.userCache[id] = this.http.get<{ data: User }>(url).pipe(
        map(response => response.data),
        shareReplay(1) // Cache the response
      );
    }
    return this.userCache[id];
  }
}
