import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiConfigService} from "../api-config.service";

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getApiUrl();
  }

  getTransports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transport`);
  }

  updateTransport(transport: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/transport`, transport);
  }

  addTransport(transport: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transport`, transport);
  }

  deleteTransport(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/transport/${id}`);
  }
}
