import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {RoomDetailComponent} from "./rooms/room-detail/room-detail.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {EditRoomComponent} from "./rooms/edit-room/edit-room.component";
import {AddRoomComponent} from "./rooms/add-room/add-room.component";
import {AuthGuard} from "./auth/auth.guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AdminGuard} from "./auth/admin.guard";
import {ProfileComponent} from "./profile/profile.component";
import {GuestsComponent} from "./guests/guests.component";
import {TransportComponent} from "./transport/transport.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {ReservationsComponent} from "./reservations/reservations.component";


const routes: Routes = [
  {path : '',redirectTo: 'login' , pathMatch: 'full'},
  {path : 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'rooms', component: RoomsComponent , canActivate: [AuthGuard] },
  { path: 'rooms/add', component: AddRoomComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: 'rooms/:id', component: RoomDetailComponent, canActivate: [AuthGuard] },
  { path: 'rooms/edit/:id', component: EditRoomComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'guests', component: GuestsComponent, canActivate: [AuthGuard] },
  { path: 'transport', component: TransportComponent, canActivate: [AuthGuard] },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard] },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
