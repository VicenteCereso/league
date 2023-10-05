import { Component,OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators} from '@angular/forms'
import{ApiService}from '../../services/api/api.service'
import{ LoginI } from '../../models/login.interface'

import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  LoginForm = new FormGroup({
    user : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  })

  constructor(private api:ApiService){  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  onLogin(form:LoginI){
    this.api.getAllUsers().subscribe(data=>{
      console.log(form);
    } );
  }

  

}

