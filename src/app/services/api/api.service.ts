import { Injectable } from '@angular/core';
import {LoginI} from '../../models/login.interface';
import {UserI} from '../../models/user.interface';
import {ResponseI} from '../../models/response.interface';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { PlayerI } from 'src/app/models/player.interface';
import { TeamI } from 'src/app/models/team.interface';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
// https://pokeapi.co/api/v2/pokemon/
  url:string= "http://localhost:8080/tech";

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<UserI[]>{
    let direccion = this.url+"/users";
    return this.http.get<UserI[]>(direccion);
  }

  getSingleUser(id: any):Observable<UserI>{
    let direccion = this.url+"/users/user/"+id
    return this.http.get<UserI>(direccion);
  }

  getUpdateUser(form: UserI):Observable<ResponseI>{
    let direccion = this.url+"/users/edit/"+form.id;
    return this.http.put<ResponseI>(direccion,form);
  }

  deleteUser(form:UserI):Observable<ResponseI>{
    let direccion = this.url+"/users/delete";
    console.log("direccion delete -> "+direccion);
    console.log("direccion delete -> "+form.apellidos);
    let Options = {
      headers:new HttpHeaders({
        'Conten-type':'application/json'
      }),
      body: form
    }
    return this.http.delete<ResponseI>(direccion,Options);
  }

  createUser(form:UserI):Observable<ResponseI>{
    let direccion = this.url+"/users/create";
    return this.http.post<ResponseI>(direccion,form);
  }

  getAllPlayers():Observable<PlayerI[]>{
    let direccion = this.url+"/jugador";
    return this.http.get<PlayerI[]>(direccion);
  }

  getSinglePlayer(id: any):Observable<PlayerI>{
    let direccion = this.url+"/jugador/jugador/"+id
    return this.http.get<PlayerI>(direccion);
  }

  getUpdatePlayer(form: PlayerI):Observable<ResponseI>{
    let direccion = this.url+"/jugador/edit/"+form.id;
    return this.http.put<ResponseI>(direccion,form);
  }

  createPlayer(form:PlayerI):Observable<ResponseI>{
    let direccion = this.url+"/jugador/create";
    return this.http.post<ResponseI>(direccion,form);
  }

  deletePlayer(form:PlayerI):Observable<ResponseI>{
    let direccion = this.url+"/jugador/delete";
    let Options = {
      headers:new HttpHeaders({
        'Conten-type':'application/json'
      }),
      body: form
    }
    return this.http.delete<ResponseI>(direccion,Options);
  }

  getAllTeams():Observable<TeamI[]>{
    let direccion = this.url+"/equipo";
    return this.http.get<TeamI[]>(direccion);
  }

  getSingleTeam(id: any):Observable<TeamI>{
    let direccion = this.url+"/equipo/equipo/"+id
    return this.http.get<TeamI>(direccion);
  }

  getUpdateTeam(form: TeamI):Observable<ResponseI>{
    let direccion = this.url+"/equipo/edit/"+form.id;
    return this.http.put<ResponseI>(direccion,form);
  }

  createTeam(form:TeamI):Observable<ResponseI>{
    let direccion = this.url+"/equipo/create";
    return this.http.post<ResponseI>(direccion,form);
  }

  deleteTeam(form:TeamI):Observable<ResponseI>{
    let direccion = this.url+"/equipo/delete";
    let Options = {
      headers:new HttpHeaders({
        'Conten-type':'application/json'
      }),
      body: form
    }
    return this.http.delete<ResponseI>(direccion,Options);
  }

  /*onLogin(form:LoginI):Observable<ResponseI>{

    return this.http.get<ResponseI>(form);
  }*/
/*
  consultPokemon():Observable<Object>{
    let pokemon = this.url+"bulbasaur";
    return this.http.get(pokemon);
  }*/

}
