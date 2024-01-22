import { Component } from '@angular/core';
import axios from '../../utils/axios';
import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {
  constructor(private router: Router){}
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
    this.router.navigate(['login'])
  }

}
