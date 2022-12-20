import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Team} from './Team';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']

})

export class TeamsComponent {
   teams!: Team[];
  constructor(private http: HttpClient) { }
  faPencil = faPencil;
  ngOnInit(): void {
    let url = environment.baseUrl+ "/Teams";
    this.http.get<Team[]>(url).subscribe(result => {
      this.teams = result;
    });
  }
}
