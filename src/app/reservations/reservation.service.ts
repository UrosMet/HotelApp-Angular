import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rezervacija`);
  }

  getReservationsByReceptionist(receptionistId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rezervacija/recepcioner/${receptionistId}`);
  }

  getGuests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/gost`);
  }

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/soba`);
  }

  getPricings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cenovnik`);
  }

  getReceptionists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recepcioner`);
  }

  updateReservation(reservation: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/rezervacija`, reservation);
  }

  deleteReservation(reservationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/rezervacija/${reservationId}`);
  }

  getReservationsByGuest(guestId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rezervacija/gost/${guestId}`);
  }

  getReservationsByRoom(roomId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rezervacija/soba/${roomId}`);
  }

  addReservation(reservation: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/rezervacija`, reservation);
  }

  addGuest(guest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/gost`, guest);
  }

}
