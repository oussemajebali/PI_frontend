import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.BASE_URL + '/auth';

  constructor(private http: HttpClient, private router: Router) { }

  signupUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl + '/register', user);
  }

  signinUser(credentials: any): Observable<any> {
    return this.http.post(this.baseUrl + '/authenticate', credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('user_id', response.user_id);
        console.log("user connceted",response);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/pages/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return !!token && role === 'UNIVERSITY_ADMIN' || role === 'CLUB_LEADER';
  }
}
