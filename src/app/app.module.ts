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
import { CreateComponent } from './views/player/create/create.component';
import { CreateTeamComponent } from './views/team/create-team/create-team.component';


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
    CreateComponent,
    CreateTeamComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
