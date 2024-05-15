import { Component, OnInit } from '@angular/core';
import { GuestService } from './guest.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent implements OnInit {
  guests: any[] = [];
  filteredGuests: any[] = [];
  searchQuery: string = '';
  newGuest: any = {
    ime: '',
    prezime: '',
    datumDolaska: '',
    datumOdlaska: '',
    tipGosta: 'Regular'
  };

  constructor(private guestService: GuestService) { }

  ngOnInit(): void {
    this.guestService.getGuests().subscribe((data: any[]) => {
      this.guests = data;
      this.filteredGuests = data;
    }, error => {
      console.error('Failed to load guests', error);
    });
  }

  onSearch(): void {
    this.filteredGuests = this.guests.filter(guest =>
      guest.ime.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      guest.prezime.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      guest.tipGosta.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  saveGuest(guest: any): void {
    this.guestService.updateGuest(guest).subscribe(() => {
      alert('Guest updated successfully');
    }, error => {
      console.error('Failed to update guest', error);
      alert('Failed to update guest');
    });
  }

  addGuest(): void {
    this.guestService.addGuest(this.newGuest).subscribe((guest: any) => {
      this.guests.push(guest);
      this.filteredGuests = [...this.guests];
      this.resetNewGuest();
      alert('Guest added successfully');
    }, error => {
      console.error('Failed to add guest', error);
      alert('Failed to add guest');
    });
  }

  deleteGuest(id: number): void {
    this.guestService.deleteGuest(id).subscribe(() => {
      this.guests = this.guests.filter(guest => guest.id !== id);
      this.filteredGuests = this.filteredGuests.filter(guest => guest.id !== id);
      alert('Guest deleted successfully');
    }, error => {
      console.error('Failed to delete guest', error);
      alert('Failed to delete guest');
    });
  }

  resetNewGuest(): void {
    this.newGuest = {
      ime: '',
      prezime: '',
      datumDolaska: '',
      datumOdlaska: '',
      tipGosta: 'Regular'
    };
  }

  isNewGuestValid(): boolean {
    return this.newGuest.ime && this.newGuest.prezime && this.newGuest.datumDolaska && this.newGuest.datumOdlaska && this.newGuest.tipGosta;
  }
}
