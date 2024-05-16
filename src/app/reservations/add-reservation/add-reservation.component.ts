import {Component, OnInit} from '@angular/core';
import {ReservationService} from "../reservation.service";
import {GuestService} from "../../guests/guest.service";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {RoomsService} from "../../rooms/rooms.service";

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
  reservation: any = {
    idGosta: { id: '' },
    idSobe: { id: '' },
    idRecepcioner: { id: '' },
    datumRezervacije: this.getTodayDate(),
    duzinaBoravka: ''
  };
  newGuest: any = {
    ime: '',
    prezime: '',
    tipGosta: 'Regular'
  };
  guests: any[] = [];
  rooms: any[] = [];
  showAddGuestForm: boolean = false;

  constructor(
    private reservationService: ReservationService,
    private guestService: GuestService,
    private roomService: RoomsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGuests();
    this.loadRooms();
    this.reservation.idRecepcioner.id = this.authService.getReceptionistId();
  }

  loadGuests(): void {
    this.guestService.getGuests().subscribe(data => {
      this.guests = data;
    }, error => {
      console.error('Failed to load guests', error);
    });
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe(data => {
      this.rooms = data;
    }, error => {
      console.error('Failed to load rooms', error);
    });
  }

  getTodayDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  }

  toggleAddGuest(): void {
    this.showAddGuestForm = !this.showAddGuestForm;
  }

  addGuest(): void {
    this.guestService.addGuest(this.newGuest).subscribe((guest: any) => {
      this.guests.push(guest);
      this.newGuest = { ime: '', prezime: '', tipGosta: 'Regular' };
      this.showAddGuestForm = false;
      alert('Gost uspešno dodat');
    }, error => {
      console.error('Failed to add guest', error);
      alert('Failed to add guest');
    });
  }

  isFormValid(): boolean {
    return this.reservation.idGosta.id && this.reservation.idSobe.id && this.reservation.datumRezervacije && this.reservation.duzinaBoravka;
  }

  addReservation(): void {
    this.reservationService.addReservation(this.reservation).subscribe(() => {
      alert('Rezervacija uspešno dodata');
      this.router.navigate(['/reservations']);
    }, error => {
      console.error('Failed to add reservation', error);
      alert('Failed to add reservation');
    });
  }

}
