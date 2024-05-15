import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private apiUrl = 'http://localhost:8080/api/transport';

  constructor(private http: HttpClient) {
  }

  getTransports(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateTransport(transport: any): Observable<any> {
    return this.http.put(this.apiUrl, transport);
  }

  addTransport(transport: any): Observable<any> {
    return this.http.post(this.apiUrl, transport);
  }

  deleteTransport(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
