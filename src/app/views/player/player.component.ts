import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../../models/player';
import { Team } from '../../models/team';
import { ApiService } from '../../services/api/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  public players:Player[]=[];
  teams:Team[];
  constructor(private api:ApiService, private router:Router){ }
  filterForm= new FormGroup({
    'idTeam': new FormControl(''),
  });


  ngOnInit(): void {
    this.api.getAllTeams().subscribe(data=> {
      this.teams = data;      
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error: "+err.error.message);
      } else {
        console.log("Server-side error: "+err.error.message);
      }
    } )
    this.api.getAllPlayersForTeam(this.filterForm.controls['idTeam'].value).subscribe(datos=>{
      this.players=datos;
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error: "+err.error.message);
      } else {
        console.log("Server-side error: "+err.error.message);
      }
    })
  }

  editPlayer(editPlayer: any){
    console.log("team id-> "+editPlayer);
    this.router.navigate(['editPlayer',editPlayer]);
  }

  newPlayer(){
    console.log("yendo a crear");
    this.router.navigate(['playerCreate']);
  }

  searchPlayerForTeam(){
    this.api.getAllPlayersForTeam(this.filterForm.controls['idTeam'].value).subscribe(datos=>{
      this.players=datos;
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error: "+err.error.message);
      } else {
        console.log("Server-side error: "+err.error.message);
      }
    })
  }
}
