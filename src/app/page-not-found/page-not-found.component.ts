import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    }, 2000);
  }

}
