import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import axios from '../utils/axios';


export const loginGuard: CanActivateFn = (route, state) => {
  const authServise = inject(AuthService)
  const router = inject(Router)
  async function validator(){
    try {
      const allCourses = await axios.get('/token')
      router.navigate(['/home'])
      return true
    } catch (error:any) {
      return true
    }
  }
  let authRes = false
  authServise.getAuthToken().subscribe((res)=>{
    authRes = res
  })
  if(authRes){
    validator()
    return true
    
  }else{
    return true
  }
};