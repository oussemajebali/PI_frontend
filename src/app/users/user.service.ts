import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.BASE_URL + '/users';

  constructor(private http: HttpClient, private router: Router) { 
  }
  getAllUsers(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.baseUrl,{ headers });
  }

  getUserById(id: number): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/${id}`,{ headers });
  }

  createUser(user: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('lastName', user.lastName);
    formData.append('age', user.age.toString());
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('role', user.role);
    if (user.avatar) {
      formData.append('avatar', user.avatar);
    }

    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(`${this.baseUrl}/adduser`, formData, { headers });
  }
  getCurrentUserName(): string | null {
    return localStorage.getItem('user_email');
  }
  updateUser(userId: number, user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') // Make sure you have the correct token here
    });

    return this.http.put(`${this.baseUrl}/update/${userId}`, user, { headers });
  }

  deleteUser(id: number): Observable<void> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers });
  }

  changePassword(request: any): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/update-password`, request);
  }
  }