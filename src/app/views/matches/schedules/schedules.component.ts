import { Component, OnInit } from '@angular/core';
import { Schedules } from '../../../models/schedules';
import { ApiService } from '../../../services/api/api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit{
  public schedules:Schedules[]=[];
  constructor(private api:ApiService, private router:Router){ }

  ngOnInit(): void {
    this.api.getAllSchedules()
    .subscribe(schedulesRes=>{
      //console.log(schedulesRes);
      this.schedules=schedulesRes;
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error: "+err.error.message);
      } else {
        console.log("Server-side error: "+err.error.message);
      }
    });
  }
  newSchedule(){
    this.router.navigate(['schedulesCreate']);
  }

  editSchedules(idSchedules:any){
    this.router.navigate(['editSchedules',idSchedules]);
  }
}
