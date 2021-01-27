import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reserve } from 'src/app/models/reserve';
import { Tour } from 'src/app/models/tour';
import {NewUser} from 'src/app/models/new-user'
import { ReserveService } from 'src/app/service/reserve.service';
import { TourService } from 'src/app/service/tour.service';
import {TokenService} from 'src/app/service/token.service';
import {AuthService} from 'src/app/service/auth.service'

@Component({
  selector: 'app-create-reserve',
  templateUrl: './create-reserve.component.html',
  styleUrls: ['./create-reserve.component.css']
})
export class CreateReserveComponent implements OnInit {
  isLogged= false;
  nombreUsuario = '';
  name='';
  reserve: Reserve;
  tour: Tour;
  usuario: NewUser;
  mail='';
  tourName='';
  tour_id=0;
  cost=0;


  constructor(private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private tourService: TourService,
    private toastr: ToastrService,
    private authService: AuthService,
    private reserveService: ReserveService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged=true;
      this.nombreUsuario = this.tokenService.getUserName(); 
      this.authService.getUser(this.nombreUsuario).subscribe(
        data =>{
          this.name=data.nombre
          this.mail=data.email
        }
      )
    } else {
      this.isLogged= false;
      this.nombreUsuario="";
      
    }
    const id = this.activatedRoute.snapshot.params.id;
    this.tourService.detail(id).subscribe(
      data =>{
       this.tour_id=data.id
       this.cost=data.cost;
       this.tourName=data.name;
      },
      err =>{
        this.toastr.error(err.error.message,'Fail',{
          timeOut: 3000, positionClass:'toast-top-center', 
        });
       
      }
    )
    this.tour={id:id}
    this.usuario={nombreUsuario:this.nombreUsuario}
    this.reserve={iva: 0,mail: "", name:"",persons:0,total:0,tourName:"",tour: this.tour,usuario:this.usuario}
  
  }
  onCreate(): void {
    
    this.reserveService.save(this.reserve).subscribe(
      data =>{

        this.toastr.success('Reserva guardada','OK',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
          this.router.navigate(['/reserve/user/'+ this.nombreUsuario]);
      },err =>{
        this.toastr.error(err.error.message,'Error',{
          timeOut: 3000, positionClass:'toast-top-center'
        });
  

      }
    )
  }
}
