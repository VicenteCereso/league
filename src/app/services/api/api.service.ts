import { Injectable } from '@angular/core';
import {LoginI} from '../../models/login.interface';
import {UserI} from '../../models/user.interface';
import {ResponseI} from '../../models/response.interface';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/team';
import { map } from 'rxjs';
import { ReqResResponse } from 'src/app/models/ReqResResponse';
interface response{results:Team[]}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
// https://pokeapi.co/api/v2/pokemon/
  //url:string= "http://localhost:8080/tech";
  url:string = "https://localhost:7182";

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

  getAllPlayers(){
    let direccion = this.url+"/player/getAllPlayers";
    return this.http.get<ReqResResponse>(direccion)
    .pipe(
      map(resp=>{
        console.log(resp);
        return resp.response.map(playerR=>Player.playerForJson(playerR));
      })
    )
  }

  getSinglePlayer(idPlayer: string){
    let direccion = this.url+"/player/getSinglePlayer?idPlayer="+idPlayer;
    return this.http.get<ReqResResponse>(direccion)
    .pipe(
      map(resp=>{
        console.log(resp);
        return resp.response.map(playerR=>Player.playerForJson(playerR));
      })
    )
  }

  getUpdatePlayer(form: Player):Observable<ResponseI>{
    let direccion = this.url+"/jugador/edit/"+form.idPlayer;
    return this.http.put<ResponseI>(direccion,form);
  }

  createPlayer(form:Player):Observable<ResponseI>{
    let direccion = this.url+"/player/savePlayer";
    return this.http.post<ResponseI>(direccion,form);
  }

  deletePlayer(form:Player):Observable<ResponseI>{
    let direccion = this.url+"/jugador/delete";
    let Options = {
      headers:new HttpHeaders({
        'Conten-type':'application/json'
      }),
      body: form
    }
    return this.http.delete<ResponseI>(direccion,Options);
  }

  getAllTeams(){
    let direccion = this.url+"/team/getAll";    
    return this.http.get<ReqResResponse>(direccion)
    .pipe(
      map(resp=>{
        console.log(resp);
        return resp.response.map(teamR=>Team.teamForJson(teamR));
      })
    )
  }

  getSingleTeam(idTeam: string){
    //let direccion = this.url+"/equipo/equipo/"+idTeam
    let direccion = this.url+"/team/getSingleTeam?idTeam="+idTeam;
    console.log(this.http.get<Team>(direccion));
    //return this.http.get<Team>(direccion);

    return this.http.get<ReqResResponse>(direccion)
    .pipe(
      map(resp=>{
        console.log(resp);
        return resp.response.map(teamR=>Team.teamForJson(teamR));
      })
    )

  }

  getUpdateTeam(form: Team):Observable<ResponseI>{
    let direccion = this.url+"/equipo/edit/"+form.idTeam;
    return this.http.put<ResponseI>(direccion,form);
  }

  createTeam(form:Team):Observable<ResponseI>{
    let direccion = this.url+"/equipo/create";
    return this.http.post<ResponseI>(direccion,form);
  }

  deleteTeam(form:Team):Observable<ResponseI>{
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
