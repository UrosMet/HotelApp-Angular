import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiConfigService} from "../api-config.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getApiUrl();
  }

  getEarnings(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/admin/earnings`);
  }
  getEarningsByDate(startDate: string, endDate: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/admin/earnings/date?startDate=${startDate}&endDate=${endDate}`);
  }
}
