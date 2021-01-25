import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Place } from 'src/app/models/place';
import { Tour } from 'src/app/models/tour';
import { PlaceService } from 'src/app/service/place.service';
import { TourService } from 'src/app/service/tour.service';

@Component({
  selector: 'app-tour-edit',
  templateUrl: './tour-edit.component.html',
  styleUrls: ['./tour-edit.component.css']
})
export class TourEditComponent implements OnInit {

  tour: Tour = null;
  places: Place[] = [];
  place: Place = null;
  constructor( private placeService: PlaceService,
    private tourService: TourService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.loadPlaces();
    const id = this.activatedRoute.snapshot.params.id;
    this.tourService.detail(id).subscribe(
      data =>{
        this.tour=data; 
        this.place=data.place;
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
    this.tourService.update(id, this.tour).subscribe(
      data =>{
        this.toastr.success('Tour actualizado','OK',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
          this.router.navigate(['/tour/list']);
      },err =>{
        this.toastr.error(err.error.message,'Fail',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
          

      }
    );
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
  
}
