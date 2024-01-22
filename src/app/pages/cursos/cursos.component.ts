import { Component, OnInit } from '@angular/core';
import axios from '../../utils/axios'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent  implements OnInit{
  modal: boolean = false
  course:any = []
  loading: boolean = true
  CourseForm = new FormGroup({
    nameCourse: new FormControl('', [Validators.required,Validators.minLength(4)]),
    contextCourse: new FormControl('', [Validators.required])
  })
 
  modalActivate(){
    this.modal = !this.modal
  }
  
  
  addCourse = async() =>{
    const newCourse = await axios.post('/course', this.CourseForm.value)
    this.modalActivate()
    this.allCourses()
    this.CourseForm.controls['nameCourse'].setValue('')
    this.CourseForm.controls['contextCourse'].setValue('')
  }

  async allCourses(){
    try {
      const allCourses = await axios.get('/courses')
      this.course = allCourses.data
      this.loading= false
    } catch (error) {
      console.log(error)
    }
  }

  Submit(){
    try {
      this.addCourse()
    } catch (error) {
      console.log(error)
    }
    
  }
  
  
  constructor(private cookie: CookieService){}

  ngOnInit(): void {
    this.allCourses()
    
  }
}
