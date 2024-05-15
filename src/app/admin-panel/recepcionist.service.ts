import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {
  private apiUrl = 'http://localhost:8080/api/recepcioner';

  constructor(private http: HttpClient) { }

  getReceptionists(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateReceptionist(receptionist: any): Observable<any> {
    return this.http.put(this.apiUrl, receptionist);
  }

  addReceptionist(receptionist: any): Observable<any> {
    return this.http.post(this.apiUrl, receptionist);
  }

  deleteReceptionist(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
