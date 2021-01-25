import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/service/token.service';
import { Tour } from '../../models/tour'
import { TourService } from '../../service/tour.service'

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {

  tours: Tour[] = [];
  roles: string[];
  isAdmin = false;

  constructor( private tourService: TourService,
    private toastr: ToastrService,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.loadTours();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
  }
  loadTours(): void {
    this.tourService.list().subscribe(
      data => {
        this.tours = data;
      },
      err => {
        console.log(err);
      }
    )
  }
  delete(id: number) {
    this.tourService.delete(id).subscribe(
      data => {
        this.toastr.success('Tour Cancelado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.loadTours();
      },
      err => {

        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    )
  }

}
