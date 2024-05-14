import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {RoomsService} from "../rooms.service";
import {Room,Cenovnik,RoomImage} from "../room.model";

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  room: Room | undefined;
  cenovnici: Cenovnik[] = [];
  selectedImages: File[] = [];
  images: RoomImage[] = [];
  alertMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private roomsService: RoomsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const roomId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(roomId) && roomId > 0) {
      this.roomsService.getRoomById(roomId).subscribe((room: Room) => {
        this.room = room;
      });
      this.roomsService.getCenovnici().subscribe((cenovnici: Cenovnik[]) => {
        this.cenovnici = cenovnici;
      });
      this.roomsService.getRoomImages(roomId).subscribe((images: RoomImage[]) => {
        this.images = images;
      });
    } else {
      console.error('Invalid room ID:', roomId);
    }
  }

  onFileSelected(event: any): void {
    this.selectedImages = Array.from(event.target.files);
  }

  saveRoomAndUploadImages(): void {
    if (this.room) {
      this.roomsService.updateRoom(this.room).subscribe(() => {
        if (this.selectedImages.length > 0) {
          // @ts-ignore
          this.roomsService.uploadImages(this.selectedImages, this.room.id).subscribe(() => {
            alert('Podaci i slike uspešno sačuvani');
            this.router.navigate(['/rooms']);
          });
        } else {
          alert('Podaci uspešno sačuvani');
          this.router.navigate(['/rooms']);
        }
      });
    }
  }

  deleteImage(imageId: number): void {
    this.roomsService.deleteImage(imageId).subscribe(() => {
      this.alertMessage = 'Slika uspešno obrisana';
      this.images = this.images.filter(image => image.id !== imageId);
    });
  }

  getImageUrl(image: RoomImage): string {
    return `http://localhost:8080/api/images/${image.slikaUrl}`;
  }


}
