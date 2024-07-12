import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private baseUrl = environment.BASE_URL + '/participations'; // Adjusted endpoint
 
  constructor(private http: HttpClient) {}
 
  createParticipation(data: any) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, data, { headers });
  }
}