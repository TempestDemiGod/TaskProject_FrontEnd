import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from '../../utils/axios';
import { CookieService } from 'ngx-cookie-service'
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit{
  modal: boolean = false
  tasks:any = []
  loading: boolean = true
  tasksForm = new FormGroup({
    nameCourse: new FormControl('', [Validators.required,Validators.minLength(4)]),
    contextCourse: new FormControl('', [Validators.required])
  })
 

  constructor(private cookie: CookieService){}

  modalActivate(){
    this.modal = !this.modal
  }
  
  
  addCourse = async() =>{
    const cookie = this.cookie.get('token')
    const newtasks = await axios.post('/course', this.tasksForm.value,{
      headers:{
        token: cookie
      }
    })
    this.modalActivate()
    this.allTasks()
  }

  async allTasks(){
    try {
      const cookie = this.cookie.get('token')
      const allCourses = await axios.get('/tasks',{
        headers:{
          token: cookie
        }
      })
      this.tasks = allCourses.data
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
  

  ngOnInit(): void {
    this.allTasks()
  }
}
