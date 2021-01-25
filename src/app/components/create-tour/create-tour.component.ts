import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Place } from 'src/app/models/place';
import { Tour } from 'src/app/models/tour';
import { PlaceService } from 'src/app/service/place.service';
import { TourService } from 'src/app/service/tour.service';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent implements OnInit {

  name="";
  description="";
  cost=0;
  disponibility=0;
  duration="";
  image="";
  place: Place
  places: Place[] = [];
  tour: Tour
  constructor(private tourService: TourService,
    private toastr: ToastrService,
    private router: Router,
    private placeService: PlaceService) { }

  ngOnInit(): void {
    this.loadPlaces();
    this.place = {id:0}
    this.tour = { name: "",description: "", cost: 0, disponibility: 0,duration: "",image: "",place: this.place}
  }
  onCreate(): void {
    
    this.tourService.save(this.tour).subscribe(
      data =>{

        this.toastr.success('Tour creado','OK',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
          this.router.navigate(['/tour/list']);
      },err =>{
        this.toastr.error(err.error.message,'Fail',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
  

      }
    )
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
