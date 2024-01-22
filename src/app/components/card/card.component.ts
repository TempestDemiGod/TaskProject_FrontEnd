import { Component, Input, OnInit } from '@angular/core';
import axios from '../../utils/axios';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  @Input() item!: any;
  @Input() curso!:boolean;
  @Input() all!:boolean;
  topic:boolean = false;
  @Input() nameCurse!:string
  constructor(){}
  
  ngOnInit(): void {
    
    if(this.curso== false){
      if(this.item.topic != '') this.topic = true
      if(this.item.topic == undefined){
        this.topic = false
      }
    }
    if(this.all== true){
      this.nameCurse = this.item.course.nameCourse
    }
  }
}
