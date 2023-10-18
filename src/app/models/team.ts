export class Team{

    static teamForJson(obj:Object){
        return new Team(
        obj['idTeam'],
        obj['name'],
        obj['image'],
        obj['logo'],
        );
    }

    constructor(
        public idTeam:number,
        public name: string,
        public image: string,
        public logo: string,
    ){}

}
