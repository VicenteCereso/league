import { Injectable } from '@angular/core';
import {LoginI} from '../../models/login.interface';
import {UserI} from '../../models/user.interface';
import {ResponseI} from '../../models/response.interface';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
// https://pokeapi.co/api/v2/pokemon/
  url:string= "http://localhost:8080/tech/users";

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<UserI[]>{
    let direccion = this.url;
    return this.http.get<UserI[]>(direccion);
  }

  getSingleUser(id: any):Observable<UserI>{
    let direccion = this.url+"/user/"+id
    return this.http.get<UserI>(direccion);
  }

  getUpdateUser(form: UserI):Observable<ResponseI>{
    let direccion = this.url+"/edit/"+form.id;
    return this.http.put<ResponseI>(direccion,form);
  }

  deleteUser(form:UserI):Observable<ResponseI>{
    let direccion = this.url+"/delete";
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
    let direccion = this.url+"/create";
    return this.http.post<ResponseI>(direccion,form);
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
