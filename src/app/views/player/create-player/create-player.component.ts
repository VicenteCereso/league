import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder , Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../../models/team';
import { AlertsService } from '../../../services/alerts/alerts.service';
import { ApiService } from '../../../services/api/api.service';
import{Player,CreateUpdatePlayer}from '../../../models/player'
import {Helper} from '../../../models/helper'
@Component({
  selector: 'app-create',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {
teams:Team[];
player:Player;
maxLength: number = 16;
newForm: UntypedFormGroup;

idPlayer: string = '';
names: string = '';
lastNames: string = '';
identification: string = '';
dateBirthday: string = '';
numberShirt: string = '';
idTeam: string = '';

constructor(private activeRouter:ActivatedRoute, private router:Router, private api:ApiService,private fb: FormBuilder){}//, private alert:AlertsService

  ngOnInit(): void {
    this.api.getAllTeams().subscribe(data=> {
      this.teams = data;      
    })
    console.log(this.teams);
    this.initializeForm();

  }

  postFormPlayer(){
    console.log(this.newForm.value);
   //console.log(this.newForm.controls['idPlayer'].value);
   //a.names=this.newForm.controls['names'].value;
    console.log(this.newForm.controls['names'].value);
    //this.players.names = this.newForm.controls['names'].value;
    //this.players.idPlayer = 0;
    
    this.api.createPlayer(this.newForm).subscribe(data=>{
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

  back(){
    this.router.navigate(['player']);
  }

  canShowErrors(controlName: string) {
    return this.newForm.controls[controlName]
      && !this.newForm.controls[controlName].valid
      && this.newForm.controls[controlName].errors
      && (this.newForm.controls[controlName].touched
        || this.newForm.controls[controlName].dirty);
  }

  initializeForm() {
    this.newForm= this.fb.group({
      'names': new UntypedFormControl(this.names, Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(Helper.OnlyAlphabeticPattern)])),
      'lastNames': new UntypedFormControl(this.lastNames, Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(Helper.OnlyAlphabeticPattern)])),
      'identification':new UntypedFormControl(this.identification, Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(Helper.OnlyAlphabeticPattern)])),
      'dateBirthday': new UntypedFormControl(this.dateBirthday, Validators.required),
      'numberShirt': '',
      'idTeam': '',
    })
  }

}
