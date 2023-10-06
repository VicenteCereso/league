import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamI } from 'src/app/models/team.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit{
  constructor(private activeRouter:ActivatedRoute, private router:Router, private api:ApiService){}

  dataTeam: TeamI;

  editForm = new FormGroup({
    id : new FormControl(''),
    nombre : new FormControl(''),
    foto : new FormControl(''),
    logo : new FormControl('')
  });


  ngOnInit(): void {
    let teamId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getSingleTeam(teamId).subscribe(data=> {
      this.dataTeam = data;
      this.editForm.setValue({
        'id':this.dataTeam.id,
        'nombre':this.dataTeam.nombre,
        'foto':this.dataTeam.foto,
        'logo': this.dataTeam.logo
        
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
    /*this.dataUser.id = this.editForm.controls['id'].value;
    this.dataUser.nombres = this.editForm.controls['nombres'].value;
    this.dataUser.apellidos = this.editForm.controls['apellidos'].value;
    this.dataUser.email = this.editForm.controls['email'].value;*/
    //this.dataUser=this.setUser();
    this.setTeam();
    this.api.getUpdateTeam(this.dataTeam).subscribe(data=>{
     /* let response:ResponseI = data;
      
      if(response.status =="ok"){
        this.alerts.showSucess('Datos modificados','Hecho')
      }else{
        console.log(response);
        this.alerts.showError('','Error');
      }*/
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

  setTeam():TeamI{
    this.dataTeam.id = this.editForm.controls['id'].value;
    this.dataTeam.nombre = this.editForm.controls['nombre'].value;
    this.dataTeam.foto = this.editForm.controls['foto'].value;
    this.dataTeam.logo = this.editForm.controls['logo'].value;
    return this.dataTeam;
  }
}
