import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/service/token.service';
import { Place } from '../../models/place'
import { PlaceService } from '../../service/place.service'

@Component({
  selector: 'app-list-place',
  templateUrl: './list-place.component.html',
  styleUrls: ['./list-place.component.css']
})
export class ListPlaceComponent implements OnInit {


  places: Place[] = [];
  roles: string[];
  isAdmin = false;


  constructor(private placeService: PlaceService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.loadPlaces();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
  }

  loadPlaces(): void {
    this.placeService.list().subscribe(
      data => {
        this.places = data;
      },
      err => {
        console.log(err);
      }
    )
  }
  delete(id: number) {
    this.placeService.delete(id).subscribe(
      data => {
        this.toastr.success('Place Borrado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.loadPlaces();
      },
      err => {

        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    )
  }

}
