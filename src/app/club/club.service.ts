import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Club } from './club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private baseUrl = environment.BASE_URL + '/clubs'; // Update to match your backend configuration

  constructor(private http: HttpClient) {}

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.baseUrl);
  }

  getClubById(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.baseUrl}/${id}`);
  }

  createClub(club: Club): Observable<Club> {
    return this.http.post<Club>(this.baseUrl, club); // Ensure this matches your backend endpoint
  }

  updateClub(id: number, club: Club): Observable<Club> {
    return this.http.put<Club>(`${this.baseUrl}/${id}`, club);
  }

  deleteClub(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
