import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import axios from '../utils/axios';
import { CookieService } from 'ngx-cookie-service';


export const authGuard: CanActivateFn = (route, state) => {
  const authServise = inject(AuthService)
  const router = inject(Router)
  const cookie = inject(CookieService)

  async function validator(cookie:any){
    try {
      const allCourses = await axios.get('/token', {
        headers:{
          token: cookie
        }
      })
      return true
    } catch (error:any) {
      return router.navigate(['/login'])
    }
  }
  let authRes = false
  authServise.getAuthToken().subscribe((res)=>{
    authRes = res
  })
  if(authRes){
    const cookieToken = cookie.get('token')
    validator(cookieToken)
    return authRes
    
  }else{
    return router.navigate(['/login'])
  }
  
};
