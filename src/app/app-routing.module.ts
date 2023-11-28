import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LoginComponent} from './views/login/login.component'
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NewComponent } from './views/new/new.component';
import { EditComponent } from './views/edit/edit.component';
import {PlayerComponent} from './views/player/player.component';
import {TeamComponent} from './views/team/team.component';
import {EditTeamComponent} from './views/team/edit-team/edit-team.component';
import {EditPlayerComponent} from './views/player/edit-player/edit-player.component';
import {CreatePlayerComponent} from './views/player/create-player/create-player.component';
import {CreateTeamComponent} from './views/team/create-team/create-team.component';
import {SchedulesComponent} from './views/matches/schedules/schedules.component'
import { NewSchedulesComponent } from './views/matches/schedules/new-schedules/new-schedules.component';
import { GamesComponent } from './views/matches/games/games.component';
import { NewGameComponent } from './views/matches/games/new-game/new-game.component';
import { EditGameComponent } from './views/matches/games/edit-game/edit-game.component';
import { EditSchedulesComponent } from './views/matches/schedules/edit-schedules/edit-schedules.component';

const routes: Routes = [
  { path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'new',component:NewComponent},
  {path:'edit/:id',component:EditComponent},
  {path:'player',component:PlayerComponent},
  {path:'playerCreate', component:CreatePlayerComponent},
  {path:'team',component:TeamComponent},
  {path:'editTeam/:idTeam', component:EditTeamComponent},
  {path:'teamCreate',component:CreateTeamComponent},
  {path:'editPlayer/:idPlayer', component:EditPlayerComponent},
  {path:'schedules',component:SchedulesComponent},
  {path:'schedulesCreate',component:NewSchedulesComponent},
  {path:'editSchedules/:idSchedules',component:EditSchedulesComponent},
  {path:'games',component:GamesComponent},
  {path:'gameCreate',component:NewGameComponent},
  {path:'editGame/:idGame',component:EditGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent=[
  LoginComponent,
  DashboardComponent,
  NewComponent,
  EditComponent,
  PlayerComponent,
  TeamComponent,
  EditTeamComponent,
  EditPlayerComponent,
  CreatePlayerComponent,
  CreateTeamComponent,
  SchedulesComponent,
  NewSchedulesComponent,
  EditSchedulesComponent,
  GamesComponent,
  NewGameComponent,
  EditGameComponent
]
