import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  public players:Player[]=[];

  constructor(private api:ApiService, private router:Router){ }
  ngOnInit(): void {
    this.api.getAllPlayers().subscribe(datos=>{
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
}
