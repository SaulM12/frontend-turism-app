import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/service/token.service';
import { Tour } from '../../models/tour'
import { TourService } from '../../service/tour.service'

@Component({
  selector: 'app-tour-list-place',
  templateUrl: './tour-list-place.component.html',
  styleUrls: ['./tour-list-place.component.css']
})
export class TourListPlaceComponent implements OnInit {

  tours: Tour[] = [];
  roles: string[];
  isAdmin = false;

  constructor(private tourService: TourService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loadPlaces()
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
    
  }
  loadPlaces(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.tourService.listForPlace(id).subscribe(
      data => {
        this.tours = data;
      },
      err => {
        console.log(err);
        this.router.navigate(['/']);
        this.toastr.error(err.error.message,'Fail',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
      }
    )
  }
}
