import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/service/token.service';
import { Reserve } from '../../models/reserve'
import { ReserveService } from '../../service/reserve.service'

@Component({
  selector: 'app-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.css']
})
export class ReserveListComponent implements OnInit {

  reserves: Reserve[] = [];
  roles: string[];
  isAdmin = false;

  constructor(private reserveService: ReserveService,
    private toastr: ToastrService,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.loadReserves();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
  }
  loadReserves(): void {
    this.reserveService.list().subscribe(
      data => {
        this.reserves = data;
        console.log(data);
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
