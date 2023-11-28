import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import{Router} from '@angular/router';
import{UserI} from '../../models/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuarios:UserI[];
  constructor(private api:ApiService, private router:Router){ }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe(datos=>{
      this.usuarios=datos;
      
    
      //console.log(datos);
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error: "+err.error.message);
      } else {
        console.log("Server-side error: "+err.error.message);
      }
    })
  }

  newUser(){
    this.router.navigate(['new']);
  }
  editUser(idTeam: any){
    this.router.navigate(['edit',idTeam]);
  }
}
