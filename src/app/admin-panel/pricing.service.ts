import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  private apiUrl = 'http://localhost:8080/api/cenovnik';

  constructor(private http: HttpClient) { }

  getPricings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updatePricing(pricing: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, pricing);
  }

  deletePricing(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  addPricing(pricing: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pricing);
  }
}
