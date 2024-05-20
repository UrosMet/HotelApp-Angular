import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiConfigService} from "../api-config.service";

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getApiUrl();
  }

  getReceptionists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recepcioner`);
  }

  updateReceptionist(receptionist: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/recepcioner`, receptionist);
  }

  addReceptionist(receptionist: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recepcioner`, receptionist);
  }

  deleteReceptionist(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/recepcioner/${id}`);
  }
}
