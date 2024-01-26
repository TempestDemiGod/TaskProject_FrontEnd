import { Component, OnInit } from '@angular/core';
import axios from '../../utils/axios';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute , Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-tareas-curso',
  templateUrl: './tareas-curso.component.html',
  styleUrls: ['./tareas-curso.component.css']
})
export class TareasCursoComponent implements OnInit{
  tasks:any =[]
  context: string= 'lorem sadalksdmls kasmdlasm salkdmlas'
 
  
  // async getTasks(){
  //   const listTasks = await axios.get('/course/665aa146ce505bf6eb7a49093')
  //   console.log(listTasks)
  // }
  editMode: boolean= false
  modal: boolean = false
  newErrors: boolean = true
  id!: any
  idTask!: any
  loading: boolean = true
  course:any = []
  name: any
  CourseForm = new FormGroup({
    nameCourse: new FormControl('', [Validators.required,Validators.minLength(6)]),
    contextCourse: new FormControl('', [Validators.required])
  })
 
  modalActivate(){
    this.modal = !this.modal
    if(this.modal == true){
      this.newErrors=true
    }
  }
  
  addTask = async() =>{
    try {
      const cookie = this.cookie.get('token')
      const newTask = await axios.post('/tasks', {
        title: this.CourseForm.value.nameCourse,
        constext: this.CourseForm.value.contextCourse, 
        course: this.id
      },{
        headers:{
          token: cookie
        }
      })
      this.modalActivate()
      this.allTasks()
    } catch (error) {
      console.log(error)
    }
  }

  async allTasks(){
    try {
      // Recupera los parámetros de la ruta
     const params = this.activatedRoute.paramMap;

     // Recupera el valor del parámetro id
     params.subscribe((paramMap) => {
       this.id = paramMap.get('id');
      //  name = paramMap.get('id');
      this.name = paramMap.get('name')?.toUpperCase();
      
     });
     const cookie = this.cookie.get('token')
      const allCourses = await axios.get('/tasks/'+ this.id ,{
        headers:{
          token: cookie
        }
      })
      this.course = allCourses.data
      this.loading= false
    } catch (error) {
      console.log(error)
    }
  }
  cambioAdd(){
    this.editMode= false
    this.CourseForm.controls['nameCourse'].setValue('')
    this.CourseForm.controls['contextCourse'].setValue('')
    this.modalActivate()
  }
  async editTaks(){
    try {
      const cookie = this.cookie.get('token')
      const editTasks = await axios.put('/task/'+this.idTask,{
        title: this.CourseForm.value.nameCourse,
        constext: this.CourseForm.value.contextCourse
      } ,{
        headers:{
          token: cookie
        }
      })
      this.allTasks()
      this.modalActivate()
    } catch (error) {
      console.log(error)
    }
  }
  async deleteTask(){
    try {
      const cookie = this.cookie.get('token')
      const TaskDelete = await axios.delete('/task/'+this.idTask ,{
        headers:{
          token: cookie
        }
      })
      this.allTasks()
      this.modalActivate()
    } catch (error) {
      console.log(error)
    }
  }
  cambioEdit(name:string , context:string, id:string){
    this.editMode= true
    this.CourseForm.controls['nameCourse'].setValue(name)
    this.CourseForm.controls['contextCourse'].setValue(context)
    this.idTask = id
    this.modalActivate()
  }

  Submit(){
    try {
      this.addTask()
    } catch (error) {
      console.log(error)
    }
    
  }

  async DeleteCourse(){
    try {
      const cookie = this.cookie.get('token')
      if(this.course.length > 0){
        for(let i = 0 ; i < this.course.length  ; i++ ){
          axios.delete('/task/'+this.course[i]._id ,{
            headers:{
              token: cookie
            }
          })
        }
      }
      axios.delete('/course/'+this.id ,{
        headers:{
          token: cookie
        }
      })
      this.router.navigate(['/'])
    } catch (error) {
      console.log(error)
    }
    
  }

  constructor(private activatedRoute: ActivatedRoute , private router: Router, private cookie: CookieService) {}

  ngOnInit(): void {
    this.allTasks()
  }

}
