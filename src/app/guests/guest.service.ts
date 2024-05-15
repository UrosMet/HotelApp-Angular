import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private apiUrl = 'http://localhost:8080/api/gost';

  constructor(private http: HttpClient) { }

  getGuests(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateGuest(guest: any): Observable<any> {
    return this.http.put(this.apiUrl, guest);
  }

  addGuest(guest: any): Observable<any> {
    return this.http.post(this.apiUrl, guest);
  }

  deleteGuest(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
