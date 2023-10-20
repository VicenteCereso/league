import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/team';
//import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
teams:Team[];
  constructor(private activeRouter:ActivatedRoute, private router:Router, private api:ApiService){}//, private alert:AlertsService

  newForm= new FormGroup({
    //idPlayer: new FormControl(0),
    'names':new FormControl(''),
    'lastNames':new FormControl(''),
    'identification': new FormControl(''),
    'dateBirthday': new FormControl(new Date()),
    'numberShirt': new FormControl(0),
    'team':new FormControl(0)
  });
  /*teamForm = new FormGroup({
    idTeam : new FormControl(0),
    nameTeam : new FormControl(''),
    imageTeam : new FormControl(),
    logo : new FormControl()
  });*/

  ngOnInit(): void {
    this.api.getAllTeams().subscribe(data=> {
      this.teams = data;
     /* this.teamForm.setValue({
        
        idTeam:data[0].idTeam,
        'nameTeam':data[0].nameTeam,
        'imageTeam':data[0].imageTeam,
        'logo': data[0].logo
        
      }),
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error: "+err.error.message);
        } else {
          console.log("Server-side error: "+err.error.message);
        }
      }*/
    })
  }

  postForm(){
    console.log()
    console.log(this.newForm.value);
    
  }
  setUser(){

  }

}
