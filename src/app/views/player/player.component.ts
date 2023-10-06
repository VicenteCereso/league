import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerI } from 'src/app/models/player.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  players:PlayerI[];
  constructor(private api:ApiService, private router:Router){ }
  ngOnInit(): void {
    this.api.getAllPlayers().subscribe(datos=>{
      this.players=datos;
      
    
      //console.log(datos);
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
