import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tour } from 'src/app/models/tour';
import { TourService } from 'src/app/service/tour.service';
import { TokenService } from '../../service/token.service';


@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {

  isAdmin = false;
  roles: string[];
  place: string[];
  tour: Tour = null;

  constructor(private tourService: TourService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void{
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
    const id = this.activatedRoute.snapshot.params.id;
    this.tourService.detail(id).subscribe(
      data =>{
        this.tour=data;
      },
      err =>{
        this.toastr.error(err.error.message,'Fail',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
       
      }
    )
  }

}
