import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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
    return this.http.post(this.baseUrl + '/authenticate', credentials);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/pages/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
