import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Cenovnik, Room, RoomImage} from './room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private roomsUrl = 'http://localhost:8080/api/soba';
  private roomImagesUrl = 'http://localhost:8080/api/sobaslike/soba';
  private cenovnikUrl = 'http://localhost:8080/api/cenovnik';
  private uploadUrl = 'http://localhost:8080/api/sobaslike/upload';
  private deleteImageUrl = 'http://localhost:8080/api/sobaslike';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    console.log('Getting rooms');
    return this.http.get<Room[]>(this.roomsUrl);
  }
  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.roomsUrl}/${id}`);
  }

  getCenovnici(): Observable<Cenovnik[]> {
    return this.http.get<Cenovnik[]>(this.cenovnikUrl);
  }
  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.roomsUrl, room);
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(this.roomsUrl, room);
  }

  uploadImages(images: File[], sobaId: number): Observable<any> {
    const formData = new FormData();
    images.forEach(image => formData.append('images', image));
    formData.append('sobaId', sobaId.toString());
    return this.http.post<any>(this.uploadUrl, formData);
  }

  getRoomImages(roomId: number): Observable<RoomImage[]> {
    return this.http.get<RoomImage[]>(`${this.roomImagesUrl}/${roomId}`);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.roomsUrl}/${id}`);
  }
  deleteImage(imageId: number): Observable<void> {
    return this.http.delete<void>(`${this.deleteImageUrl}/${imageId}`);
  }
}
