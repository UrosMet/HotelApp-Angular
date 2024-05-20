import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiConfigService} from "../api-config.service";

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getApiUrl();
  }

  getPricings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cenovnik`);
  }

  updatePricing(pricing: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cenovnik`, pricing);
  }

  deletePricing(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cenovnik/${id}`);
  }

  addPricing(pricing: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cenovnik`, pricing);
  }
}
