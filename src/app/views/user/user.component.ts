import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  UserForm = new FormGroup({
    id : new FormControl('',Validators.required),
    nombres : new FormControl('',Validators.required),
    apellidos : new FormControl('',Validators.required),
    correo : new FormControl('',Validators.email),
  })
  constructor(private api:ApiService){  }
  ngOnInit(): void {
    this.onConsultUser()
  }

  onConsultUser(){
    this.api.getAllUsers().subscribe(dat=>{console.log(dat)});
  }
}
