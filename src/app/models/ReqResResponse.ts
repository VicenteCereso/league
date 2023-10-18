import { Team } from "./team";


 export interface ReqResResponse {
    mensaje:  string;
    response: Team[];
}

interface TeamI {
    idTeam: number;
    name:   string;
    image:  string;
    logo:   string;
}


