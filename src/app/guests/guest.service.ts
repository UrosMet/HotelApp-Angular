import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiConfigService} from "../api-config.service";

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getApiUrl();
  }

  getGuests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/gost`);
  }

  updateGuest(guest: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/gost`, guest);
  }

  addGuest(guest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/gost`, guest);
  }

  deleteGuest(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/gost/${id}`);
  }

}
