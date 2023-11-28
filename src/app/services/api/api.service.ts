import { Injectable } from '@angular/core';
import {LoginI} from '../../models/login.interface';
import {UserI} from '../../models/user.interface';
import {ResponseI} from '../../models/response.interface';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { CreateUpdatePlayer, Player } from '../../models/player';
import { Team } from '../../models/team';
import { map } from 'rxjs';
import { ReqResGames, ReqResPlayer, ReqResSchedules, ReqResTeam } from '../../models/ReqResResponse';
import { FormGroup } from '@angular/forms';
import { Schedules } from '../../models/schedules';
import { Games } from 'src/app/models/games';
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
    return this.http.get<ReqResTeam>(direccion)
    .pipe(
      map(resp=>{
        return resp.response.map(playerR=>Player.playerForJson(playerR));
      })
    )
  }

  getAllPlayersForTeam(idTeam: string){
    let direccion = this.url+"/player/getAllPlayersForTeam?idTeam="+idTeam;
    return this.http.get<ReqResTeam>(direccion)
    .pipe(
      map(resp=>{
        return resp.response.map(playerR=>Player.playerForJson(playerR));
      })
    )
  }

  getSinglePlayer(idPlayer: string){
    let direccion = this.url+"/player/getSinglePlayer?idPlayer="+idPlayer;
    return this.http.get<ReqResPlayer>(direccion)
    .pipe(
      map(resp=>{
        return resp.response.map(playerR=>Player.playerForJson(playerR));
      })
    )
  }

  getUpdatePlayer(form: Player){
    let direccion = this.url+"/jugador/edit/"+form.idPlayer;
    return this.http.put<ReqResPlayer>(direccion,form).pipe(
      map(resp=>{
        return resp.response.map(playerR=>Player.playerForJson(playerR));
      })
    )
  }

  createPlayer(form:FormGroup){
    let direccion = this.url+"/player/savePlayer";
    return this.http.post<ReqResPlayer>(direccion,form.value).pipe(
      map(resp=>{
        return resp.response.map(playerR=>Player.playerForJson(playerR));
      })
    );
  }

  updatePlayer(form:FormGroup){
    let direccion = this.url+"/player/updatePlayer";
    return this.http.put<ReqResPlayer>(direccion,form.value).pipe(
      map(resp=>{
        return resp.response.map(playerR=>Player.playerForJson(playerR));
      })
    );
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
    return this.http.get<ReqResTeam>(direccion)
    .pipe(
      map(resp=>{
        return resp.response.map(teamR=>Team.teamForJson(teamR));
      })
    )
  }

  getSingleTeam(idTeam: string){
    let direccion = this.url+"/team/getSingleTeam?idTeam="+idTeam;
    return this.http.get<ReqResTeam>(direccion)
    .pipe(
      map(resp=>{
        return resp.response.map(teamR=>Team.teamForJson(teamR));
      })
    )

  }

  updateTeam(form: FormGroup){
    let direccion = this.url+"/team/updateTeam";
    return this.http.put<ReqResTeam>(direccion,form.value).pipe(
      map(resp=>{
        return resp.response.map(teamR=>Team.teamForJson(teamR));
      })
    );
  }

  createTeam(form:FormGroup){
    let direccion = this.url+"/team/saveTeam";
    return this.http.post<ReqResTeam>(direccion,form.value).pipe(
      map(resp=>{
        return resp.response.map(teamR=>Team.teamForJson(teamR));
      })
    );
  }
  deleteTeam(form:FormGroup){
    let direccion = this.url+"/equipo/delete";
    let Options = {
      headers:new HttpHeaders({
        'Conten-type':'application/json'
      }),
      body: form
    }
    return this.http.delete<ReqResTeam>(direccion,Options).pipe(
      map(resp=>{
        return resp.response.map(teamR=>Team.teamForJson(teamR));
      })
    );
  }

  getAllSchedules(){
    let direccion = this.url+"/schedules/getAllSchedules";    
    return this.http.get<ReqResSchedules>(direccion)
    .pipe(
      map(resp=>{
        return resp.response.map(schedulesR=>Schedules.schedulesForJson(schedulesR));
      })
    )
  }

  getSchedulesForId(idSchedules:string){
    let direccion = this.url+"/schedules/getSchedulesForId?idSchedules="+idSchedules;    
    return this.http.get<ReqResSchedules>(direccion)
    .pipe(
      map(resp=>{
        return resp.response.map(schedulesR=>Schedules.schedulesForJson(schedulesR));
      })
    )
  }

  createSchedules(form:FormGroup){
    let direccion = this.url+"/schedules/saveSchedules";
    return this.http.post<ReqResSchedules>(direccion,form.value)
    /*.pipe(
      map(resp=>{
        return resp.response.map(schedulesR=>Schedules.schedulesForJson(schedulesR));
      })
    )*/;
  }

  updateSchedules(form:FormGroup){
    let direccion = this.url+"/schedules/updateSchedules";
    return this.http.put<ReqResSchedules>(direccion,form.value)
    /*.pipe(
      map(resp=>{
        return resp.response.map(schedulesR=>Schedules.schedulesForJson(schedulesR));
      })
    )*/;
  }

  getAllGames(){
    let direccion = this.url+"/games/getAllGames";
    return this.http.get<ReqResGames>(direccion)
    .pipe(
      map(resp=>{
        return resp.response.map(gamesR=>Games.gamesForJson(gamesR));
      })
    )
  }

  getGamesForDate(dateSearch: Date){
    let direccion = this.url+"/games/getGamesForDate?dateTime="+dateSearch;
    return this.http.get<ReqResGames>(direccion)
    .pipe(
      map(resp=>{
        return resp.response.map(gamesR=>Games.gamesForJson(gamesR));
      })
    )
  }

  getSingleGames(idGame: string){
    //let direccion = this.url+"/equipo/equipo/"+idTeam
    let direccion = this.url+"/games/getGamesForId?idGames="+idGame;
    return this.http.get<ReqResGames>(direccion)
    .pipe(
      map(resp=>{
        return resp.response.map(gameR=>Games.gamesForJson(gameR));
      })
    )
  }
  updateGames(form:FormGroup){
    let direccion = this.url+"/games/updateGames";
    return this.http.put<ReqResGames>(direccion,form.value)/*.pipe(
      map(resp=>{
        return resp.response.map(gameR=>Games.gamesForJson(gameR));
      })
    );*/
  }
  createGames(form:FormGroup){
    let direccion = this.url+"/games/saveGames";
    return this.http.post<ReqResGames>(direccion,form.value/*).pipe(
      map(resp=>{
        return resp.response.map(gameR=>Games.gamesForJson(gameR));
      })*/
    );
  }
}
