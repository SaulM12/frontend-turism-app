import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  isLogged = false;
  isAdmin = false;
  roles: string[];
  nombreUsuario = '';
  constructor(private tokenService: TokenService) { }

  ngOnInit() {
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

  onLogOut(): void{
    this.tokenService.logOuth();
    window.location.reload();
  }

}
