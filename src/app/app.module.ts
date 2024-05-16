import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailComponent } from './rooms/room-detail/room-detail.component';
import {AuthService} from "./auth/auth.service";
import {TokenInterceptorService} from "./auth/token-interceptor.service";
import { EditRoomComponent } from './rooms/edit-room/edit-room.component';
import { AddRoomComponent } from './rooms/add-room/add-room.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { GuestsComponent } from './guests/guests.component';
import { TransportComponent } from './transport/transport.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ReservationsComponent } from './reservations/reservations.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    RoomsComponent,
    RoomDetailComponent,
    EditRoomComponent,
    AddRoomComponent,
    FooterComponent,
    PageNotFoundComponent,
    ProfileComponent,
    GuestsComponent,
    TransportComponent,
    AdminPanelComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
