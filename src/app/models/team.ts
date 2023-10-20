export class Team{

    static teamForJson(obj:Object){
        return new Team(
        obj['idTeam'],
        obj['nameTeam'],
        obj['imageTeam'],
        obj['logo'],
        );
    }

    constructor(
        public idTeam:number,
        public nameTeam: string,
        public imageTeam: ImageBitmap,
        public logo: ImageBitmap,
    ){}

}
