import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private baseUrl = environment.BASE_URL + '/clubs';
  private membershipUrl = environment.BASE_URL + '/memberships'; 
  constructor(private http: HttpClient) {}

  createClub(club: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, club);
  }
// Add or modify these methods in ClubService
approveClub(id: number): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/approve/${id}`, {});
}

rejectClub(id: number): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/reject/${id}`, {});
}
 // Approve join request with a POST
 approveJoinRequest(membership: any): Observable<any> {
  membership.status = 'APPROVED';  // Set status to APPROVED
  return this.http.post<any>(`${this.membershipUrl}/process`, membership);
}

// Reject join request with a POST
rejectJoinRequest(membership: any): Observable<any> {
  membership.status = 'REJECTED';  // Set status to REJECTED
  return this.http.post<any>(`${this.membershipUrl}/process`, membership);
}


requestToJoinClub(joinData: any): Observable<any> {
  return this.http.post<any>(`${this.membershipUrl}/request`, joinData);
}
  // Get all clubs
  getAllClubs(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Get a club by ID
  getClubById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Delete a club by ID
  deleteClub(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Update a club
  updateClub(id: number, club: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, club);
  }
}
