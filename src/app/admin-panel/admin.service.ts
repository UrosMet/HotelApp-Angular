import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  getEarnings(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/earnings`);
  }
  getEarningsByDate(startDate: string, endDate: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/earnings/date?startDate=${startDate}&endDate=${endDate}`);
  }
}
