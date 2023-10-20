import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { ApiService } from 'src/app/services/api/api.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit{
  file:File;
  photoSelected: string | ArrayBuffer;
  constructor(private activeRouter:ActivatedRoute, private router:Router, private api:ApiService){}

  dataTeam: Team;

  editForm = new FormGroup({
    idTeam : new FormControl(0),
    nameTeam : new FormControl(''),
    imageTeam : new FormControl(),
    logo : new FormControl()
  });


  ngOnInit(): void {
    let teamId = this.activeRouter.snapshot.paramMap.get('idTeam');
    this.api.getSingleTeam(teamId).subscribe(data=> {
      //this.dataTeam = data[0];
      this.editForm.setValue({
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
    this.dataTeam.nameTeam = this.editForm.controls['nameTeam'].value;
    this.dataTeam.imageTeam = this.editForm.controls['imageTeam'].value;
    this.dataTeam.logo = this.editForm.controls['logo'].value;
    return this.dataTeam;
  }

  onPhotoSelected(event:Event):void{
    const files: FileList = (event.target as HTMLInputElement).files!;
    if(files && files[0]){
      this.file = <File> files[0]; 
      //image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }
}
