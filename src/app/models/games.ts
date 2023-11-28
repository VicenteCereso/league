import { Schedules } from "./schedules";

export class Games{
static gamesForJson(obj:Object){
    return new Games(
    obj['idGames'],
    obj['idTeamL'],
    obj['nameTeamL'],
    obj['idTeamV'],
    obj['nameTeamV'],
    obj['dateGames'],
    obj['idSchedules'],
    obj['schedules']
    );
}

constructor(
    public idGames:number,
    public idTeamL: number ,
    public nameTeamL: string,
    public idTeamV: number,
    public nameTeamV: string,
    public dateGames: string,
    public idSchedules: number,
    public schedules:string
){}

}