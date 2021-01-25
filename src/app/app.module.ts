import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPlaceComponent } from './components/list-place/list-place.component';
import { DetailPlaceComponent } from './components/detail-place/detail-place.component';
import { CreatePlaceComponent } from './components/create-place/create-place.component';
import { EditPlaceComponent } from './components/edit-place/edit-place.component';
import {interceptorProvider} from './interceptors/place-interceptor.service'

import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'

//External
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './components/index/index.component';
import { FooterComponent } from './footer/footer.component';
import { TourListComponent } from './components/tour-list/tour-list.component';
import { CreateTourComponent } from './components/create-tour/create-tour.component';
import { TourDetailComponent } from './components/tour-detail/tour-detail.component';
import { TourListPlaceComponent } from './components/tour-list-place/tour-list-place.component';
import { TourEditComponent } from './components/tour-edit/tour-edit.component';
import { ReserveListComponent } from './components/reserve-list/reserve-list.component';
import { ReserveListUserComponent } from './components/reserve-list-user/reserve-list-user.component';
import { CreateReserveComponent } from './components/create-reserve/create-reserve.component';



@NgModule({
  declarations: [
    AppComponent,
    ListPlaceComponent,
    DetailPlaceComponent,
    CreatePlaceComponent,
    EditPlaceComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    IndexComponent,
    FooterComponent,
    TourListComponent,
    CreateTourComponent,
    TourDetailComponent,
    TourListPlaceComponent,
    TourEditComponent,
    ReserveListComponent,
    ReserveListUserComponent,
    CreateReserveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule 
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
