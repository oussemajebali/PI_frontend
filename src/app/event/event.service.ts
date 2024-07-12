import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = environment.BASE_URL + '/event';
 
  constructor(private http: HttpClient) {}
 
  getAllEvents(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.baseUrl, { headers });
  }
 
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }
 
  createEvent(formData: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/addevent`, formData, { headers });
  }
 
  updateEvent(id: number, event: any): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/${id}`, event);
  }
 
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
  createRating(rating: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/rating/addrating`, rating, { headers });
  }
  
}