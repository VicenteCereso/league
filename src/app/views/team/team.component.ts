import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamI } from 'src/app/models/team.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit{
  teams:TeamI[];
  constructor(private api:ApiService, private router:Router){ }
  ngOnInit(): void {
    this.api.getAllTeams().subscribe(datos=>{
      this.teams=datos;
      console.log(datos);
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error: "+err.error.message);
      } else {
        console.log("Server-side error: "+err.error.message);
      }
    })
  }

  editTeam(id: any){
    console.log("team id-> "+id);
    this.router.navigate(['editTeam',id]);
  }
}
