import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { faBed, faCalendarCheck, faUsers, faCar, faUser, faTools, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faBed = faBed;
  faCalendarCheck = faCalendarCheck;
  faUsers = faUsers;
  faCar = faCar;
  faUser = faUser;
  faTools = faTools;
  faSignOutAlt = faSignOutAlt;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }
}
