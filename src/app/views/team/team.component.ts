import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { ApiService } from 'src/app/services/api/api.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit{
  public teams:Team[]=[];
  constructor(private api:ApiService, private router:Router){ }
  ngOnInit(): void {
    this.api.getAllTeams()
    .subscribe(teamsRes=>{
      console.log(teamsRes);
      this.teams=teamsRes;
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error: "+err.error.message);
      } else {
        console.log("Server-side error: "+err.error.message);
      }
    });
  }

  editTeam(editTeam: any){
    console.log("team id-> "+editTeam);
    this.router.navigate(['editTeam',editTeam]);
  }
}
