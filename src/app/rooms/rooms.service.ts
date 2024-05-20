import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Cenovnik, Room, RoomImage} from './room.model';
import {ApiConfigService} from "../api-config.service";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getApiUrl();
  }

  getRooms(): Observable<Room[]> {
    console.log('Getting rooms');
    return this.http.get<Room[]>(`${this.apiUrl}/soba`);
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/soba/${id}`);
  }

  getCenovnici(): Observable<Cenovnik[]> {
    return this.http.get<Cenovnik[]>(`${this.apiUrl}/cenovnik`);
  }

  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/soba`, room);
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/soba`, room);
  }

  uploadImages(images: File[], sobaId: number): Observable<any> {
    const formData = new FormData();
    images.forEach(image => formData.append('images', image));
    formData.append('sobaId', sobaId.toString());
    return this.http.post<any>(`${this.apiUrl}/sobaslike/upload`, formData);
  }

  getRoomImages(roomId: number): Observable<RoomImage[]> {
    return this.http.get<RoomImage[]>(`${this.apiUrl}/sobaslike/soba/${roomId}`);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/soba/${id}`);
  }

  deleteImage(imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sobaslike/${imageId}`);
  }
}
