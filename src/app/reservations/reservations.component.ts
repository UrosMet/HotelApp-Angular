import {Component, OnInit} from '@angular/core';
import {ReservationService} from "./reservation.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = [];
  guests: any[] = [];
  rooms: any[] = [];
  pricings: any[] = [];
  receptionists: any[] = [];
  filteredReservations: any[] = [];
  selectedGuestId: string = '';
  selectedRoomId: string = '';
  isAdmin: boolean = false;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    this.loadGuests();
    this.loadRooms();
    this.loadPricings();
    this.loadReceptionists();

    if (this.isAdmin) {
      this.loadAllReservations();
    } else {
      const receptionistId = this.authService.getReceptionistId();
      if (receptionistId != null) {
        this.loadReservationsByReceptionist(receptionistId);
      }
    }
  }

  loadAllReservations(): void {
    this.reservationService.getReservations().subscribe(data => {
      this.reservations = data;
      this.filteredReservations = data;
    }, error => {
      console.error('Failed to load reservations', error);
    });
  }

  loadReservationsByReceptionist(receptionistId: number): void {
    this.reservationService.getReservationsByReceptionist(receptionistId).subscribe(data => {
      this.reservations = data;
      this.filteredReservations = data;
    }, error => {
      console.error('Failed to load reservations', error);
    });
  }

  loadGuests(): void {
    this.reservationService.getGuests().subscribe(data => {
      this.guests = data;
    }, error => {
      console.error('Failed to load guests', error);
    });
  }

  loadRooms(): void {
    this.reservationService.getRooms().subscribe(data => {
      this.rooms = data;
    }, error => {
      console.error('Failed to load rooms', error);
    });
  }

  loadPricings(): void {
    this.reservationService.getPricings().subscribe(data => {
      this.pricings = data;
    }, error => {
      console.error('Failed to load pricings', error);
    });
  }

  loadReceptionists(): void {
    this.reservationService.getReceptionists().subscribe(data => {
      this.receptionists = data;
    }, error => {
      console.error('Failed to load receptionists', error);
    });
  }

  saveReservation(reservation: any): void {
    this.reservationService.updateReservation(reservation).subscribe(() => {
      alert('Reservation updated successfully');
      if (this.isAdmin) {
        this.loadAllReservations();
      } else {
        const receptionistId = this.authService.getReceptionistId();
        if (receptionistId != null) {
          this.loadReservationsByReceptionist(receptionistId);
        }
      }
    }, error => {
      console.error('Failed to update reservation', error);
      alert('Failed to update reservation');
    });
  }

  deleteReservation(reservationId: number): void {
    this.reservationService.deleteReservation(reservationId).subscribe(() => {
      this.reservations = this.reservations.filter(reservation => reservation.id !== reservationId);
      this.filteredReservations = this.filteredReservations.filter(reservation => reservation.id !== reservationId);
      alert('Reservation deleted successfully');
    }, error => {
      console.error('Failed to delete reservation', error);
      alert('Failed to delete reservation');
    });
  }

  filterByGuest(): void {
    if (this.selectedGuestId) {
      this.filteredReservations = this.reservations.filter(reservation => reservation.idGosta.id === parseInt(this.selectedGuestId, 10));
    } else {
      this.filteredReservations = this.reservations;
    }
  }

  filterByRoom(): void {
    if (this.selectedRoomId) {
      this.filteredReservations = this.reservations.filter(reservation => reservation.idSobe.id === parseInt(this.selectedRoomId, 10));
    } else {
      this.filteredReservations = this.reservations;
    }
  }

}
