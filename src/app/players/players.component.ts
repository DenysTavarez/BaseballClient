import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Player } from './players';
import { TeamPlayers } from './teamPlayers';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players?: TeamPlayers;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    let teamId = idParam ? +idParam : null;

   // let url = `${environment.baseUrl}/Teams/TeamPlayers/${teamId}` 
    let url = teamId ? `${environment.baseUrl}/Teams/TeamPlayers/${teamId}` : `${environment.baseUrl}api/Players`;
    this.http.get<TeamPlayers>(url).subscribe(result => {
      this.players = result;
      console.log(this.players);
    });
  }

}
