import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit{
  constructor(private activeRouter:ActivatedRoute, private router:Router, private api:ApiService){}

  dataTeam: Team;

  editForm = new FormGroup({
    idTeam : new FormControl(0),
    name : new FormControl(''),
    image : new FormControl(''),
    logo : new FormControl('')
  });


  ngOnInit(): void {
    let teamId = this.activeRouter.snapshot.paramMap.get('idTeam');
    this.api.getSingleTeam(teamId).subscribe(data=> {
      //this.dataTeam = data[0];
      this.editForm.setValue({
        idTeam:data[0].idTeam,
        'name':data[0].name,
        'image':data[0].image,
        'logo': data[0].logo
        
      }),
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error: "+err.error.message);
        } else {
          console.log("Server-side error: "+err.error.message);
        }
      }
    })
  }
  postForm(){
    this.setTeam();
    this.api.getUpdateTeam(this.dataTeam).subscribe(data=>{
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
  deleteTeam(){
    this.api.deleteTeam(this.setTeam()).subscribe(data=>{
      console.log(data);
    });
  }

  newTeam(){
    this.api.createTeam(this.setTeam()).subscribe(data=>{
      console.log(data);
    });
  }

  setTeam():Team{
    this.dataTeam.idTeam = this.editForm.controls['idTeam'].value;
    this.dataTeam.name = this.editForm.controls['name'].value;
    this.dataTeam.image = this.editForm.controls['image'].value;
    this.dataTeam.logo = this.editForm.controls['logo'].value;
    return this.dataTeam;
  }
}
