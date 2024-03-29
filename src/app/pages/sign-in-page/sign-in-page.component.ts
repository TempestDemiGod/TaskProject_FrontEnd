import { Component, Inject, OnInit } from '@angular/core';
import axios from "../../utils/axios";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timeout } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
// import axios from 'axios';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})



export class SignInPageComponent implements OnInit{
  constructor( private router: Router, private cookie: CookieService){}
  useForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)])
  })
  RegisterForm = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)])
  })
  register: boolean=false
  errors:any = []
  auth = async() => {
    try {
      let user = await axios.post('/signin',this.useForm.value).then(res=>{
        console.log('res')
    console.log(res)
    const token = res.data.token;
    console.log(token)
    const now = new Date();
    const expires = new Date(now.getTime() + 10 * 60 * 1000);

    document.cookie = `token=${token}; expires=${expires.toUTCString()};`;
      })
      this.router.navigate(["/"])
      
      const cookie = this.cookie.get('token')
      console.log('cookie local')
    console.log(cookie)
    } catch (error) {
      let e:any = error
      this.errors = e.response.data
      const timer = setTimeout(()=>{
        this.errors = []
      },3000)
      
    }
  }
  

  Register = async() => {
    try {
      console.log(this.RegisterForm)
      let user = await axios.post('/signup',this.RegisterForm.value).then(res=>{
        console.log('res')
    console.log(res)
    const token = res.data.data.token;
    console.log(token)
    const now = new Date();
    const expires = new Date(now.getTime() + 10 * 60 * 1000);

    document.cookie = `token=${token}; expires=${expires.toUTCString()};`;
      })
      this.router.navigate(["/"])
    } catch (error) {
      let e:any = error
      this.errors = e.response.data
      const timer = setTimeout(()=>{
        this.errors = []
      },3000)
      
    }
  }

  Submit(){
    try {
      this.auth()
    } catch (error) {
      console.log(error)
    }
    
  }

  RegisterSubmit(){
    try {
      this.Register()
    } catch (error) {
      console.log(error)
    }
    
  }

  
  ngOnInit(): void {

  }
}
