export class Player{

    static playerForJson(obj:Object){
        return new Player(
        obj['idPlayer'],
        obj['names'],
        obj['lastNames'],
        obj['dateBirthday'],
        obj['identification'],
        obj['numberShirt'],
        obj['idTeam'],
        obj['nameTeam']
        );
    }

    constructor(
        public idPlayer:string,
        public names: string ,
        public lastNames: string,
        public dateBirthday: Date,
        public identification: string,
        public numberShirt: string,
        public idTeam: string,
        public nameTeam: string,
        
    ){}
}
export class CreateUpdatePlayer{
    idPlayer:string;
    names: string ;
    lastNames: string;
    dateBirthday: Date;
    identification: string;
    numberShirt: string;
    idTeam: string;
    nameTeam: string;
}