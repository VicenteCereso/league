import { Component, OnInit } from '@angular/core';
import { Team } from '../../../../models/team';
import { Schedules } from '../../../../models/schedules';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/utils/utils.service';
import { ApiService } from 'src/app/services/api/api.service';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit{
  teamsL:Team[];
  teamsV:Team[];
  
  schedules:Schedules[];
  newForm= new FormGroup({
    idTeamL:new FormControl(),
    idTeamV: new FormControl(),
    'dateGames': new FormControl(''),
    idSchedules: new FormControl()
  });
  ngOnInit(): void {
    this.getTeams();
    this.getSchedules()
  }
  constructor(private activeRouter:ActivatedRoute,private api:ApiService,private router:Router, private utils:UtilsService, private datePipe:DatePipe){}
  getTeams(): void {
    this.teamsL= this.utils.getTeams();
    //this.teamsV= this.utils.getTeams();
  }

  getSchedules():void{
    this.api.getAllSchedules().subscribe(data=>{
      this.schedules = data;
    })
  }
  back(){
    this.router.navigate(['games']);
  }
  
  postForm(){
    this.api.createGames(this.newForm).subscribe(data=>{
      console.log("Response Create->"+data.mensaje);
      /*find(data2=>{
        
      })*/
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error: "+err.error.message);
      } else {
        console.log("Server-side error: "+err.error.message);
      }
    }
  );
  }

  deleteOption(event: Event, select: HTMLSelectElement){
    console.log("option "+select.value);
    this.teamsV= this.utils.getTeams();
    this.teamsV.find(data=>{
      if(data!=undefined && data.idTeam.toString() === select.value.substring(3,4)){
        var index = this.teamsV.indexOf(data)
        this.teamsV.splice(index,1);
      }       
    })
  }
}
