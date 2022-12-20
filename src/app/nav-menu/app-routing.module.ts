import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login.component';
import { PlayersComponent } from '../players/players.component';
//import { CityEditComponent } from './players/player-edit.component';
import { CounterComponent } from '../counter/counter.component';
import { TeamsComponent } from '../teams/teams.component';
//import { CountryEditComponent } from '../teams/team-edit.component';
//import { CountryPopulationComponent } from '../countries/country-population.component';
import { HealthCheckComponent } from '../health-check/health-check.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'players/:id', component: PlayersComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'teams', component: TeamsComponent },
  //{ path: 'countrypopulation/:id', component: CountryPopulationComponent },
  //{ path: 'player-edit/:id', component: PlayerEditComponent },
  //{ path: 'player-edit', component: PlayerEditComponent },
 // { path: 'country-edit/:id', component: CountryEditComponent },
  //{ path: 'country-edit', component: CountryEditComponent },
  { path: 'health-check', component: HealthCheckComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
