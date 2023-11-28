import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../../models/player';
import { Team } from '../../../models/team';
import { ApiService } from '../../../services/api/api.service';
import { DatePipe } from '@angular/common';
import { UtilsService } from '../../../utils/utils.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit{
  teams:Team[];
  constructor(private activeRouter:ActivatedRoute, private router:Router, private api:ApiService, private utils:UtilsService){}
  dataPlayer = Player;
  editForm= new FormGroup({
    'idPlayer': new FormControl(''),
    'names':new FormControl(''),
    'lastNames':new FormControl(''),
    'identification': new FormControl(''),
    'dateBirthday': new FormControl(),
    'numberShirt': new FormControl(''),
    'idTeam': new FormControl(''),
  });

  ngOnInit(): void {
    this.api.getAllTeams().subscribe(data=> {
      this.teams = data;      
    })
    let playerId = this.activeRouter.snapshot.paramMap.get('idPlayer');
    this.api.getSinglePlayer(playerId).subscribe(data=> {
      //this.dataTeam = data[0];
      console.log("--> "+data[0].idTeam)
      this.editForm.setValue({
        'idPlayer':data[0].idPlayer,
        'names':data[0].names,
        'lastNames':data[0].lastNames,
        'identification': data[0].identification,
        'dateBirthday': this.utils.convertDateTimeToDate(data[0].dateBirthday.toString().substring(0,10)),
        'numberShirt': data[0].numberShirt,
        'idTeam': data[0].idTeam
        
      })
    }),
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error: "+err.error.message);
      } else {
        console.log("Server-side error: "+err.error.message);
      }
    }
  }

  postForm(){
    this.api.updatePlayer(this.editForm).subscribe(data=>{
      console.log(data[0]);
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

  back(){
    this.router.navigate(['player']);
  }
 
}
