import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import {HttpClientModule} from '@angular/common/http'
import{ReactiveFormsModule,FormsModule}from '@angular/forms';
import { UserComponent } from './views/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { TeamComponent } from './views/team/team.component';
import { PlayerComponent } from './views/player/player.component';
import { EditComponent } from './views/edit/edit.component';
import { EditTeamComponent } from './views/team/edit-team/edit-team.component';
import { EditPlayerComponent } from './views/player/edit-player/edit-player.component';
import { CreatePlayerComponent } from './views/player/create-player/create-player.component';
import { CreateTeamComponent } from './views/team/create-team/create-team.component';
import { DatePipe } from '@angular/common';
import { GamesComponent } from './views/matches/games/games.component';
import { SchedulesComponent } from './views/matches/schedules/schedules.component';
import { NewSchedulesComponent } from './views/matches/schedules/new-schedules/new-schedules.component';
import { NewGameComponent } from './views/matches/games/new-game/new-game.component';
import { EditGameComponent } from './views/matches/games/edit-game/edit-game.component';
import { EditSchedulesComponent } from './views/matches/schedules/edit-schedules/edit-schedules.component';
import { SidebarComponent } from './plantillas/sidebar/sidebar.component';
import { ResultsComponent } from './views/results/results.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponent,
    UserComponent,
    TeamComponent,
    PlayerComponent,
    EditComponent,
    EditTeamComponent,
    EditPlayerComponent,
    CreatePlayerComponent,
    CreateTeamComponent,
    GamesComponent,
    SchedulesComponent,
    NewSchedulesComponent,
    NewGameComponent,
    EditGameComponent,
    EditSchedulesComponent,
    SidebarComponent,
    ResultsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
