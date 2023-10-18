import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/models/player';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit{
  constructor(private activeRouter:ActivatedRoute, private router:Router, private api:ApiService){}
  dataPlayer = Player;
  editForm= new FormGroup({
    idPlayer: new FormControl(0),
    'names':new FormControl(''),
    'lastNames':new FormControl(''),
    'identification': new FormControl(''),
    'dateBirthday': new FormControl(new Date()),
    'numberShirt': new FormControl(0),
  });

  ngOnInit(): void {
    let playerId = this.activeRouter.snapshot.paramMap.get('idPlayer');
    this.api.getSinglePlayer(playerId).subscribe(data=> {
      //this.dataTeam = data[0];
      this.editForm.setValue({
        idPlayer:data[0].idPlayer,
        'names':data[0].names,
        'lastNames':data[0].lastNames,
        'identification': data[0].identification,
        'dateBirthday': data[0].dateBirthday,
        'numberShirt': data[0].numberShirt,
        
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

  }
}
