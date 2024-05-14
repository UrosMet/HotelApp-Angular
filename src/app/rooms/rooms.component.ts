import { Component, OnInit } from '@angular/core';
import { RoomsService } from './rooms.service';
import { Room, RoomImage } from './room.model';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  roomImages: { [key: number]: RoomImage[] } = {};
  isAdmin: boolean = false;

  constructor(private roomsService: RoomsService , private authService : AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.roomsService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      this.rooms.forEach(room => {
        this.roomsService.getRoomImages(room.id).subscribe((images: RoomImage[]) => {
          this.roomImages[room.id] = images;
        });
      });
    });
  }

  getImageUrl(image: RoomImage): string {
    return `http://localhost:8080/api/images/${image.slikaUrl}`;
  }

  deleteRoom(id: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovu sobu?')) {
      this.roomsService.deleteRoom(id).subscribe(() => {
        this.rooms = this.rooms.filter(room => room.id !== id);
      });
    }
  }
}
