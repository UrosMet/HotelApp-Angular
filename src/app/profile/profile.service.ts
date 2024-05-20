import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiConfigService} from "../api-config.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getApiUrl();
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recepcioner/${id}`);
  }

  updateUser(userData: FormData): Observable<any> {
    return this.http.put<any>(this.apiUrl, userData);
  }
}
