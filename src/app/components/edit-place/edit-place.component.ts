import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Place } from 'src/app/models/place';
import { PlaceService } from 'src/app/service/place.service';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {

  place: Place = null;

  constructor(
    private placeService: PlaceService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.placeService.detail(id).subscribe(
      data =>{
        this.place=data;
      },
      err =>{
        this.toastr.error(err.error.message,'Fail',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
        this.router.navigate(['/']);
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.placeService.update(id, this.place).subscribe(
      data =>{
        this.toastr.success('Destino turistico actualizado','OK',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
          this.router.navigate(['/places']);
      },err =>{
        this.toastr.error(err.error.message,'Fail',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
          //this.router.navigate(['/']);

      }
    );
  }

}
