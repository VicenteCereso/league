import { Component, OnInit, Pipe } from '@angular/core';
import { Team } from '../../../../models/team';
import { Helper } from '../../../../models/helper';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from 'src/app/services/api/api.service';
import { DatePipe } from '@angular/common';
import { Schedules } from '../../../../models/schedules';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit{
  teamsL:Team[];
  teamsV:Team[];
  schedules:Schedules[];
  editForm= new FormGroup({
    idGames: new FormControl(),
    idTeamL:new FormControl(),
    'nameTeamL':new FormControl(''),
    idTeamV: new FormControl(),
    'nameTeamV': new FormControl(),
    'dateGames': new FormControl(''),
    //'timeInit': new FormControl(''),
    //'timeFinish': new FormControl(''),
    idSchedules: new FormControl()
  });
  constructor(private activeRouter:ActivatedRoute,private api:ApiService,private router:Router, private utils:UtilsService, private datePipe:DatePipe){}

  ngOnInit(): void {
    let gameId = this.activeRouter.snapshot.paramMap.get('idGame');
    this.api.getSingleGames(gameId).subscribe(data=> {
    this.editForm.setValue({
      idGames:data[0].idGames,
      idTeamL:data[0].idTeamL,
      'nameTeamL':data[0].nameTeamL,
      idTeamV: data[0].idTeamV,
      'nameTeamV': data[0].nameTeamV,
      'dateGames': data[0].dateGames,//this.utils.convertDateTimeToDate() ,
      //'timeInit': this.setTimeFinish(data[0].timeInit),
      //'timeFinish': this.setTimeFinish(data[0].timeFinish),
      idSchedules: data[0].idSchedules
    })
  }),(err: HttpErrorResponse) => {
    if (err.error instanceof Error) {
      console.log("Client-side error: "+err.error.message);
    } else {
      console.log("Server-side error: "+err.error.message);
    }
  }
    this.getTeams();
    this.getSchedules();
  }

  getTeams(): void {
    this.teamsL= this.utils.getTeams();
    this.teamsV= this.utils.getTeams();
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
    this.api.updateGames(this.editForm).subscribe(data=>{
      console.log(data);
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

  setTimeFinish(hours:string):string{    
    const dateCurrent = '1990-01-01';
    const currentTimeFinish = hours;// this.newSchedulesForm.controls['timeInit'].value;
    const currentDate = new Date(`${dateCurrent}T${currentTimeFinish}`);

    // Agregar minutos a la hora
    //currentDate.setMinutes(currentDate.getMinutes() + minutes);

    // Formatear la nueva hora como una cadena en el formato deseado
    const newTimeFinish = this.datePipe.transform(hours, 'HH:mm');

    console.log(newTimeFinish)
    // Actualizar el valor en el formulario
    return newTimeFinish;
    
    
  }
}
