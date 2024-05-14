import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RoomsService} from "../rooms.service";
import {Room , RoomImage} from "../room.model";

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room: Room | undefined;
  images: RoomImage[] = [];

  constructor(
    private route: ActivatedRoute,
    private roomsService: RoomsService
  ) {}

  ngOnInit(): void {
    const roomId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(roomId) && roomId > 0) {
      this.roomsService.getRoomById(roomId).subscribe((room: Room) => {
        this.room = room;
      });
      this.roomsService.getRoomImages(roomId).subscribe((images: RoomImage[]) => {
        this.images = images;
      });
    } else {
      console.error('Invalid room ID:', roomId);
    }
  }

  getImageUrl(image: RoomImage): string {
    return `http://localhost:8080/api/images/${image.slikaUrl}`;
  }
}
