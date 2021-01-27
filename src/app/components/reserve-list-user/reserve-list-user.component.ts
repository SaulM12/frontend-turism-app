import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/service/token.service';
import { Reserve } from '../../models/reserve'
import { ReserveService } from '../../service/reserve.service'

@Component({
  selector: 'app-reserve-list-user',
  templateUrl: './reserve-list-user.component.html',
  styleUrls: ['./reserve-list-user.component.css']
})
export class ReserveListUserComponent implements OnInit {

  reserves: Reserve[] = [];
  roles: string[];
  isAdmin = false;
  nombreUsuario = '';
  isLogged = false;
  constructor(private reserveService: ReserveService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadReserves();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
    if (this.tokenService.getToken()) {
      this.isLogged = true
      this.nombreUsuario = this.tokenService.getUserName();
    } else {
      this.isLogged = false
      this.nombreUsuario = '';
    }
  }
  

  loadReserves(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.reserveService.listForUser(id).subscribe(
      data => {
        this.reserves = data;
      },
      err => {
        console.log(err);
      }
    )
  }
  delete(id: number) {
    this.reserveService.delete(id).subscribe(
      data => {
        this.toastr.success('Reserva Cancelada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.loadReserves();
      },
      err => {

        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    )
  }

}
