import { Games } from "./games";
import { Player } from "./player";
import { Schedules } from "./schedules";
import { Team } from "./team";


 export interface ReqResTeam {
    mensaje:  string;
    response: Team[];
}
export interface ReqResPlayer {
    mensaje:  string;
    response: Player[];
}

export interface ReqResSchedules {
    mensaje:  string;
    response: Schedules[];
}

export interface ReqResGames {
    mensaje:  string;
    response: Games[];
}

interface TeamI {
    idTeam: number;
    name:   string;
    image:  string;
    logo:   string;
}
interface PlayerI{
    idPlayer:string;
    names: string ;
    lastNames: string;
    dateBirthday: Date;
    identification: string;
    numberShirt: string;
    idTeam: string;
    nameTeam: string;
}

