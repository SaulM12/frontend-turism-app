import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Place } from 'src/app/models/place';
import { PlaceService } from 'src/app/service/place.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-detail-place',
  templateUrl: './detail-place.component.html',
  styleUrls: ['./detail-place.component.css']
})
export class DetailPlaceComponent implements OnInit {

  isAdmin = false;
  roles: string[];

  place: Place = null;

  constructor(
    private placeService: PlaceService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
    const id = this.activatedRoute.snapshot.params.id;
    this.placeService.detail(id).subscribe(
      data =>{
        this.place=data;
      },
      err =>{
        this.toastr.error(err.error.message,'Fail',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
        this.volver();
      }
    )
  }
  volver():void{
    this.router.navigate(['/places'])
  }
}
