import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = environment.BASE_URL + '/event';
  private userUrl = environment.BASE_URL + '/users';
  private rateUrl = environment.BASE_URL + '/rating';
 
  constructor(private http: HttpClient) {}
 
  getAllEvents(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.baseUrl, { headers });
  }
 
  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
 
  createEvent(formData: FormData): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/addevent`, formData, { headers });
  }

  updateEvent(id: number, event: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, event);
  }
 
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
 
  getParticipatedEvents(userName: string): Observable<any[]> {
    return this.getAllEvents().pipe(
      map(events => 
        events.filter(event => 
          event.participations.some(p => p.userName === userName) && 
          new Date(event.endTime) < new Date()
        )
      )
    );
  }

  createRating(rating: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.rateUrl}/addrating`, rating, { headers });
  }
  
}