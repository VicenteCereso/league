import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LoginComponent} from './views/login/login.component'
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NewComponent } from './views/new/new.component';
import { EditComponent } from './views/edit/edit.component';
import {PlayerComponent} from './views/player/player.component';
import {TeamComponent} from './views/team/team.component';
import{EditTeamComponent} from './views/team/edit-team/edit-team.component';
import{EditPlayerComponent} from './views/player/edit-player/edit-player.component';
import{CreateComponent} from './views/player/create/create.component';
import{CreateTeamComponent} from './views/team/create-team/create-team.component';

const routes: Routes = [
  { path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'new',component:NewComponent},
  {path:'edit/:id',component:EditComponent},
  {path:'player',component:PlayerComponent},
  {path:'playerCreate', component:CreateComponent},
  {path:'team',component:TeamComponent},
  {path:'editTeam/:idTeam', component:EditTeamComponent},
  {path:'teamCreate',component:CreateTeamComponent},
  {path:'editPlayer/:idPlayer', component:EditPlayerComponent}
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
  CreateComponent,
  CreateTeamComponent
]
