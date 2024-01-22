import { Injectable } from '@angular/core';
import axios from '../utils/axios';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookie: CookieService) { }
  async validator(){
    try {
      const allCourses = await axios.get('/token')
      return true
    } catch (error:any) {
      return false
    }
  }
  
  getAuthToken(): Observable<boolean>{
    const cookie = this.cookie.get('token')
    let resToken
    if(cookie.length == 0){
      return of(false)
    }
    
    this.validator().then(res =>{
        resToken = res
    })
    if(resToken == false){
      return of(false)
    }
    return of(true)
  }

}
