import { Component } from '@angular/core';
import axios from '../../utils/axios';
import { ActivatedRoute , Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {
  constructor(private router: Router , private cookie: CookieService){}
  step: string ='step1'
  auth: boolean = false
  menu: boolean = false
  authmenu(){
    this.auth = !this.auth
  }

  menuF(){
    this.menu = !this.menu
  }
  logout(){
    axios.get('/logout')
    const token = this.cookie.get('token')
    console.log(token)
    document.cookie = `token=${token}; expires=${new Date(0).toUTCString()};`;
    // document.cookie = `${token}; expires=${new Date(0).toUTCString()};`;
    this.router.navigate(['login'])
  }
  
}
