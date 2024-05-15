import { Component, OnInit } from '@angular/core';
import { TransportService } from './transport.service';
import {GuestService} from "../guests/guest.service";

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  transports: any[] = [];
  filteredTransports: any[] = [];
  guests: any[] = [];
  searchQuery: string = '';
  newTransport: any = {
    vrstaTransporta: '',
    idGosta: { id: '' }
  };

  constructor(private transportService: TransportService, private guestService: GuestService) { }

  ngOnInit(): void {
    this.transportService.getTransports().subscribe((data: any[]) => {
      this.transports = data;
      this.filteredTransports = data;
    }, error => {
      console.error('Failed to load transports', error);
    });

    this.guestService.getGuests().subscribe((data: any[]) => {
      this.guests = data;
    }, error => {
      console.error('Failed to load guests', error);
    });
  }

  onSearch(): void {
    this.filteredTransports = this.transports.filter(transport =>
      transport.vrstaTransporta.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      transport.idGosta.ime.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      transport.idGosta.prezime.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  saveTransport(transport: any): void {
    const selectedGuest = this.guests.find(guest => guest.id === transport.idGosta.id);
    if (selectedGuest) {
      transport.idGosta = selectedGuest;
    }
    this.transportService.updateTransport(transport).subscribe(() => {
      alert('Transport updated successfully');
    }, error => {
      console.error('Failed to update transport', error);
      alert('Failed to update transport');
    });
  }

  addTransport(): void {
    const selectedGuest = this.guests.find(guest => guest.id === this.newTransport.idGosta.id);
    if (selectedGuest) {
      this.newTransport.idGosta = selectedGuest;
    }
    this.transportService.addTransport(this.newTransport).subscribe((transport: any) => {
      this.transports.push(transport);
      this.filteredTransports = [...this.transports];
      this.resetNewTransport();
      alert('Transport added successfully');
    }, error => {
      console.error('Failed to add transport', error);
      alert('Failed to add transport');
    });
  }

  deleteTransport(id: number): void {
    this.transportService.deleteTransport(id).subscribe(() => {
      this.transports = this.transports.filter(transport => transport.id !== id);
      this.filteredTransports = this.filteredTransports.filter(transport => transport.id !== id);
      alert('Transport deleted successfully');
    }, error => {
      console.error('Failed to delete transport', error);
      alert('Failed to delete transport');
    });
  }

  resetNewTransport(): void {
    this.newTransport = {
      vrstaTransporta: '',
      idGosta: { id: '' }
    };
  }

  isNewTransportValid(): boolean {
    return this.newTransport.vrstaTransporta && this.newTransport.idGosta.id;
  }
}
