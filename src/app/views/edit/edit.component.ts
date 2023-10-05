import { Component, OnInit } from '@angular/core';

import {Router,ActivatedRoute} from '@angular/router';
import{UserI} from '../../models/user.interface';
import {ApiService} from '../../services/api/api.service';
import{FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
//import {AlertsService} from '../../services/alerts/alerts.service'   , private alerts:AlertsService
import { ResponseI } from 'src/app/models/response.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  constructor(private activeRouter:ActivatedRoute, private router:Router, private api:ApiService){}

  dataUser: UserI;

  editForm = new FormGroup({
    id : new FormControl(''),
    nombres : new FormControl(''),
    apellidos : new FormControl(''),
    email : new FormControl('')
  });


  ngOnInit(): void {
    let userId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getSingleUser(userId).subscribe(data=> {
      this.dataUser = data;
      this.editForm.setValue({
        'id':this.dataUser.id,
        'nombres':this.dataUser.nombres,
        'apellidos':this.dataUser.apellidos,
        'email': this.dataUser.email
        
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
    this.setUser();
    this.api.getUpdateUser(this.dataUser).subscribe(data=>{
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
  deleteUser(){
    this.api.deleteUser(this.setUser()).subscribe(data=>{
      console.log(data);
    });
  }

  newUser(){
    this.api.createUser(this.setUser()).subscribe(data=>{
      console.log(data);
    });
  }

  setUser():UserI{
    this.dataUser.id = this.editForm.controls['id'].value;
    this.dataUser.nombres = this.editForm.controls['nombres'].value;
    this.dataUser.apellidos = this.editForm.controls['apellidos'].value;
    this.dataUser.email = this.editForm.controls['email'].value;
    return this.dataUser;
  }
}
