import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  teams:Team[];
  constructor(private datepipe: DatePipe, private api: ApiService) { }

  convertDateTimeToDate(dateTime: string): string {
    console.log("dateTime "+dateTime)
    let latest_date = this.datepipe.transform(dateTime, 'yyyy-MM-dd');
    let toDate=(latest_date).substring(0,10);
    console.log("toDate "+toDate)
    return toDate;
  }

  getTeams(){    
    this.api.getAllTeams().subscribe(data=> {
       this.teams = data;      
     })
     return this.teams;
}
}
