import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import axios from '../utils/axios';


export const authGuard: CanActivateFn = (route, state) => {
  const authServise = inject(AuthService)
  const router = inject(Router)
  async function validator(){
    try {
      const allCourses = await axios.get('/token')
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
    validator()
    return authRes
    
  }else{
    return router.navigate(['/login'])
  }
  
};
