import { Component, OnInit } from '@angular/core';
import {ReceptionistService} from "./recepcionist.service";
import {AdminService} from "./admin.service";
import {PricingService} from "./pricing.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  receptionists: any[] = [];
  newReceptionist: any = {
    ime: '',
    prezime: '',
    korisnickoIme: '',
    lozinka: '',
    role: 'USER',
    profilnaSlika: 'profile.png'
  };
  selectedFiles: { [key: number]: File | null } = {};
  earnings: number | null = null;
  startDate: string = '';
  endDate: string = '';

  pricings: any[] = [];
  newPricing: any = {
    cenaPoNoci: null
  };

  constructor(private receptionistService: ReceptionistService, private adminService: AdminService,private pricingService: PricingService) { }

  ngOnInit(): void {
    this.loadReceptionists();
    this.loadEarnings();
    this.loadPricings();
  }

  loadReceptionists(): void {
    this.receptionistService.getReceptionists().subscribe((data: any[]) => {
      this.receptionists = data;
    }, error => {
      console.error('Failed to load receptionists', error);
    });
  }

  loadEarnings(): void {
    this.adminService.getEarnings().subscribe((data: number) => {
      this.earnings = data;
    }, error => {
      console.error('Failed to load earnings', error);
    });
  }

  loadEarningsByDate(): void {
    if (this.startDate && this.endDate) {
      this.adminService.getEarningsByDate(this.startDate, this.endDate).subscribe((data: number) => {
        this.earnings = data;
      }, error => {
        console.error('Failed to load earnings by date', error);
      });
    }
  }

  loadPricings(): void {
    this.pricingService.getPricings().subscribe((data: any[]) => {
      this.pricings = data;
    }, error => {
      console.error('Failed to load pricings', error);
    });
  }

  savePricing(pricing: any): void {
    this.pricingService.updatePricing(pricing).subscribe(() => {
      alert('Pricing saved successfully');
      this.loadPricings();
    }, error => {
      console.error('Failed to save pricing', error);
      alert('Failed to save pricing');
    });
  }

  addPricing(): void {
    this.pricingService.addPricing(this.newPricing).subscribe((pricing: any) => {
      this.pricings.push(pricing);
      this.resetNewPricing();
      alert('Pricing added successfully');
    }, error => {
      console.error('Failed to add pricing', error);
      alert('Failed to add pricing');
    });
  }

  deletePricing(id: number): void {
    this.pricingService.deletePricing(id).subscribe(() => {
      this.pricings = this.pricings.filter(pricing => pricing.id !== id);
      alert('Pricing deleted successfully');
    }, error => {
      console.error('Failed to delete pricing', error);
      alert('Failed to delete pricing');
    });
  }

  saveReceptionist(receptionist: any): void {
    const formData = new FormData();
    formData.append('id', receptionist.id.toString());
    formData.append('ime', receptionist.ime);
    formData.append('prezime', receptionist.prezime);
    formData.append('korisnicko_ime', receptionist.korisnickoIme);
    formData.append('lozinka', receptionist.lozinka);
    formData.append('role', receptionist.role);
    if (this.selectedFiles[receptionist.id]) {
      // @ts-ignore
      formData.append('profilna_slika', this.selectedFiles[receptionist.id]);
    }

    this.receptionistService.updateReceptionist(formData).subscribe(() => {
      alert('Receptionist saved successfully');
      this.loadReceptionists();
      this.selectedFiles[receptionist.id] = null; // Reset selected file
    }, error => {
      console.error('Failed to save receptionist', error);
      alert('Failed to save receptionist');
    });
  }

  addReceptionist(): void {
    const newReceptionistData = {
      ime: this.newReceptionist.ime,
      prezime: this.newReceptionist.prezime,
      korisnickoIme: this.newReceptionist.korisnickoIme,
      lozinka: this.newReceptionist.lozinka,
      role: this.newReceptionist.role,
      profilnaSlika: this.newReceptionist.profilnaSlika
    };

    this.receptionistService.addReceptionist(newReceptionistData).subscribe((receptionist: any) => {
      this.receptionists.push(receptionist);
      this.resetNewReceptionist();
      alert('Receptionist added successfully');
    }, error => {
      console.error('Failed to add receptionist', error);
      alert('Failed to add receptionist');
    });
  }

  deleteReceptionist(id: number): void {
    this.receptionistService.deleteReceptionist(id).subscribe(() => {
      this.receptionists = this.receptionists.filter(receptionist => receptionist.id !== id);
      alert('Receptionist deleted successfully');
    }, error => {
      console.error('Failed to delete receptionist', error);
      alert('Failed to delete receptionist');
    });
  }

  onFileSelected(event: any, receptionistId: number | 'new'): void {
    // @ts-ignore
    this.selectedFiles[receptionistId] = event.target.files[0];
  }

  deleteImage(receptionist: any): void {
    receptionist.profilnaSlika = 'default.png';
    this.selectedFiles[receptionist.id] = null;
  }

  resetNewReceptionist(): void {
    this.newReceptionist = {
      ime: '',
      prezime: '',
      korisnickoIme: '',
      lozinka: '',
      role: 'USER',
      profilnaSlika: 'profile.png'
    };
    // @ts-ignore
    this.selectedFiles['new'] = null;
  }

  getImageUrl(imageName: string): string {
    return `http://localhost:8080/api/images/${imageName}`;
  }

  isNewReceptionistValid(): boolean {
    return this.newReceptionist.ime && this.newReceptionist.prezime && this.newReceptionist.korisnickoIme && this.newReceptionist.lozinka;
  }

  resetNewPricing(): void {
    this.newPricing = {
      cenaPoNoci: null
    };
  }

  isNewPricingValid(): boolean {
    return this.newPricing.cenaPoNoci;
  }

}
