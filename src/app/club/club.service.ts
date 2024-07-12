import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from './club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private apiUrl = '/api/v1/clubs';

  constructor(private http: HttpClient) {}

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.apiUrl);
  }

  getClubById(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/${id}`);
  }

  createClub(club: Club): Observable<Club> {
    return this.http.post<Club>(`${this.apiUrl}/addclub`, club);
  }

  updateClub(id: number, club: Club): Observable<Club> {
    return this.http.put<Club>(`${this.apiUrl}/${id}`, club);
  }

  deleteClub(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}