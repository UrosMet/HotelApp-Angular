import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RoomsService} from "../rooms.service";
import {Room,Cenovnik} from "../room.model";

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  room: Room = {
    id: 0,
    brojKreveta: 0,
    tipKreveta: '',
    cenovnik: {
      id: 0,
      cenaPoNoci: 0
    },
    klima: false
  };
  cenovnici: Cenovnik[] = [];
  selectedImages: File[] = [];
  roomSaved: boolean = false;
  alertMessage: string | null = null;

  constructor(
    private roomsService: RoomsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomsService.getCenovnici().subscribe((cenovnici: Cenovnik[]) => {
      this.cenovnici = cenovnici;
    });
  }

  onFileSelected(event: any): void {
    this.selectedImages = Array.from(event.target.files);
  }

  saveRoom(): void {
    this.roomsService.addRoom(this.room).subscribe((newRoom: Room) => {
      this.room = newRoom;
      this.roomSaved = true;
      this.alertMessage = 'Soba uspešno sačuvana. Sada možete dodati slike.';
    });
  }

  uploadImages(): void {
    if (this.selectedImages.length > 0) {
      this.roomsService.uploadImages(this.selectedImages, this.room.id).subscribe(() => {
        this.alertMessage = 'Slike uspešno učitane';
        setTimeout(() => {
          this.router.navigate(['/rooms']);
        }, 1000); // Dodaj mali delay pre preusmeravanja kako bi korisnik mogao da vidi poruku
      });
    }
  }
}
