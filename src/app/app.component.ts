import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'IT355';
  showNavbar = true;
  showFooter = true;

  constructor(private router: Router ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateVisibility(event.urlAfterRedirects);
    });
  }

  updateVisibility(url: string): void {
    const hiddenRoutes = ['/login', '/page-not-found'];
    this.showNavbar = !hiddenRoutes.includes(url);
    this.showFooter = !hiddenRoutes.includes(url);
  }
}
