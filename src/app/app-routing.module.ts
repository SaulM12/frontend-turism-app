import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePlaceComponent } from './components/create-place/create-place.component';
import { CreateReserveComponent } from './components/create-reserve/create-reserve.component';
import { CreateTourComponent } from './components/create-tour/create-tour.component';
import { DetailPlaceComponent } from './components/detail-place/detail-place.component';
import { EditPlaceComponent } from './components/edit-place/edit-place.component';
import { IndexComponent } from './components/index/index.component';
import { ListPlaceComponent } from './components/list-place/list-place.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register.component';
import { ReserveListUserComponent } from './components/reserve-list-user/reserve-list-user.component';
import { ReserveListComponent } from './components/reserve-list/reserve-list.component';
import { TourDetailComponent } from './components/tour-detail/tour-detail.component';
import { TourEditComponent } from './components/tour-edit/tour-edit.component';
import { TourListPlaceComponent } from './components/tour-list-place/tour-list-place.component';
import { TourListComponent } from './components/tour-list/tour-list.component';
import { PlaceGuardService as guard } from './guards/place-guard.service';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'places', component: ListPlaceComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'detail/:id', component: DetailPlaceComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'new', component: CreatePlaceComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'edit/:id', component: EditPlaceComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  {path: 'tour/list', component: TourListComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  {path: 'tour/create', component: CreateTourComponent , canActivate: [guard], data: { expectedRol: ['admin'] }},
  {path: 'tour/detail/:id', component: TourDetailComponent , canActivate: [guard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'tour/place/:id', component: TourListPlaceComponent , canActivate: [guard], data: { expectedRol: ['admin', 'user'] }},
  {path: 'tour/edit/:id', component: TourEditComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  {path: 'reserve/list', component: ReserveListComponent, canActivate: [guard], data: { expectedRol: ['admin'] }},
  {path:'reserve/user/:id', component: ReserveListUserComponent, canActivate: [guard], data: { expectedRol: ['user'] }},
  {path:'reserve/create/:id', component: CreateReserveComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] }},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
