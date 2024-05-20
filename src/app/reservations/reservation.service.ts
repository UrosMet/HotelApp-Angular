import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiConfigService} from "../api-config.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getApiUrl();
  }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rezervacija`);
  }

  getReservationsByReceptionist(receptionistId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rezervacija/recepcioner/${receptionistId}`);
  }

  getGuests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/gost`);
  }

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/soba`);
  }

  getPricings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cenovnik`);
  }

  getReceptionists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recepcioner`);
  }

  updateReservation(reservation: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/rezervacija`, reservation);
  }

  deleteReservation(reservationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/rezervacija/${reservationId}`);
  }

  getReservationsByGuest(guestId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rezervacija/gost/${guestId}`);
  }

  getReservationsByRoom(roomId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rezervacija/soba/${roomId}`);
  }

  addReservation(reservation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rezervacija`, reservation);
  }

  addGuest(guest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/gost`, guest);
  }

}
