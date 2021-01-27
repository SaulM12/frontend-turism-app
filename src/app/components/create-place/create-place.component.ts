import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Place } from 'src/app/models/place';
import { PlaceService } from 'src/app/service/place.service';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit {

  name  = '';
  description = '';
  ubication  = '';
  image1 = '';
  image2 = '';
  image3 = '';

  constructor(private placeService: PlaceService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }


  onCreate(): void {
    const place = new Place(this.name, this.description, this.ubication, this.image1,this.image2,this.image3,) 
    this.placeService.save(place).subscribe(
      data =>{

        this.toastr.success('Place creado','OK',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
          this.router.navigate(['/places']);
      },err =>{
        this.toastr.error(err.error.message,'Fail',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
          

      }
    )
  }
}
