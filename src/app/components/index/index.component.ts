import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged= false;
  nombreUsuario = '';
  isAdmin = false;
  roles: string[];

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
    if(this.tokenService.getToken()){
      this.isLogged=true;
      this.nombreUsuario = this.tokenService.getUserName();
    } else {
      this.isLogged= false;
      this.nombreUsuario="";
    }
  }

}
