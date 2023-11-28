import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Games } from 'src/app/models/games';
import { Schedules } from 'src/app/models/schedules';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  public games:Games[]=[];
  schedules:Schedules[]=[];
  filterForm= new FormGroup({
    'dateSearch': new FormControl(),
  });

  constructor(private api:ApiService, private router:Router){ }
  ngOnInit(): void {
    this.gamesAll();
    
  }

  gamesAll(){
    if(this.filterForm.controls['dateSearch'].value == null){
      this.api.getAllGames().subscribe(datos=>{
        this.games=datos;    
        //this.games['schedules'].setValue();
       
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error: "+err.error.message);
        } else {
          console.log("Server-side error: "+err.error.message);
        }
      }); 
    }
    
  }

  searchGamesForDate(){
    this.api.getGamesForDate(this.filterForm.controls['dateSearch'].value).subscribe(datos=>{
      this.games=datos;
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error: "+err.error.message);
      } else {
        console.log("Server-side error: "+err.error.message);
      }
    })
  }
  
  editGames(editGames: any){
    console.log("game id-> "+editGames);
    this.router.navigate(['editGame',editGames]);
  }

  createGames(){
    this.router.navigate(['gameCreate']);
  }
}
