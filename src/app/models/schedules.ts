export class Schedules{

    static schedulesForJson(obj:Object){
        return new Schedules(
        obj['idSchedules'],
        obj['dateProgram'],
        obj['timeInit'],
        obj['timeFinish'],
        );
    }

    constructor(
        public idSchedules:number,
        public dateProgram: string,
        public timeInit: string,
        public timeFinish: string,
    ){}
}