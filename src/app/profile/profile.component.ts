import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  newPassword: string = '';
  confirmPassword: string = '';
  profileImage: File | null = null;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.ID_Recepcionera;
      this.profileService.getUserById(userId).subscribe(
        data => this.user = data,
        error => this.errorMessage = 'Failed to load user data'
      );
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.profileImage = event.target.files[0];
    }
  }

  deleteProfileImage(): void {
    this.profileImage = null;
    this.user.profilnaSlika = '';
  }

  getProfileImageUrl(): string {
    return `http://localhost:8080/api/images/${this.user.profilnaSlika}`;
  }

  saveProfile(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New passwords do not match';
      return;
    }

    const formData = new FormData();
    formData.append('id', this.user.id);
    formData.append('ime', this.user.ime);
    formData.append('prezime', this.user.prezime);
    formData.append('korisnicko_ime', this.user.korisnickoIme);
    formData.append('lozinka', this.newPassword);

    // Dodajemo novu sliku ako je dodata
    if (this.profileImage) {
      formData.append('profilna_slika', this.profileImage);
    }

    this.profileService.updateUser(formData).subscribe(
      () => {
        alert('Profile updated successfully');
        this.router.navigate(['/home']);
      },
      error => this.errorMessage = 'Failed to update profile'
    );
  }
}
