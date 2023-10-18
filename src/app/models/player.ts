export class Player{

    static playerForJson(obj:Object){
        return new Player(
        obj['idPlayer'],
        obj['names'],
        obj['lastNames'],
        obj['dateBirthday'],
        obj['identification'],
        obj['numberShirt'],
        );
    }

    constructor(
        public idPlayer:number,
        public names: string,
        public lastNames: string,
        public dateBirthday: Date,
        public identification: string,
        public numberShirt: number,
    ){}

}