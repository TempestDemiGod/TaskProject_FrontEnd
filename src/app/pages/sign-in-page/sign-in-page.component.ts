import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import axios from 'axios';


@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit{

  constructor(){}

  ngOnInit(): void {
      // this.authService.loginRequest({
      //   "email": "tempest@gmail.com",
      //   "password": "tempest1234"
      // })
      const cors = axios.post('http://localhost:3000/api/cors')
      console.log(cors)
      
  }
}
