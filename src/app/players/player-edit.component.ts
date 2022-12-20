import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Team } from '../teams/Team';
import { Player } from './players';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class CityEditComponent implements OnInit {
  // the view title
  title?: string;

  // the form model
  form!: FormGroup;

  // the player object to edit
  player?: Player;
  id?: number;
  team?: Team[];
  
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient){}

  ngOnInit(): void {
     this.form = new FormGroup({
      name: new FormControl(''),
      lattitude: new FormControl(''),
      longitude: new FormControl(''),
      countryId: new FormControl('')
    });

    this.loadData();
  }

    loadData() {
      this.loadCountries();

      // retrieve the ID from the 'id' parameter
      let idParam = this.activatedRoute.snapshot.paramMap.get('id');
      let id = idParam ? +idParam : 0;
  
      if (id) {
        
          // fetch the player from the server
          var url = `${environment.baseUrl}api/Cities/${id}`;
          this.http.get<Player>(url).subscribe({
            next: result => {
            this.player = result;
            this.title = `Edit - ${this.player.name}`;
      
            // update the form with the player value
            this.form.patchValue(this.player);
          }, 
          error: error => console.error(error)
        });
      }
      else{
        this.title = "Create a new Player";
      }
  }

  loadCountries() {
    // fetch all the teams from the server
    var url = environment.baseUrl + 'api/Countries';
    this.http.get<Team[]>(url).subscribe({
      next: result => {
      this.team = result;
    }, 
    error: error => console.error(error)});
  }

  onSubmit() {
    var player = this.id ? this.player : <Player>{};
    if (player) {
      player.name = this.form.controls['name'].value;
      player.age = +this.form.controls['age'].value;
      player.gamesPlayed = +this.form.controls['gamesPlayed'].value;
      player.teamId +this.form.controls['teamId'].value;

      if (this.id) {
        // existing player
        let url = environment.baseUrl + 'api/Players/' + player.id;
        this.http
          .put<Player>(url, player)
          .subscribe({next: () => {
            console.log(`Player ${player!.id} has been updated.`);

            // go back to cities view
            this.router.navigate(['/players']);
          }, 
          error: error => console.error(error)});
      } else {
        // new
        var url = `${environment.baseUrl}api/Players`;
        this.http
          .post<Player>(url, player)
          .subscribe({next: result => {
            console.log("Player " + result.id + " has been created.");
            // go back to cities view
            this.router.navigate(['/players']);
          }, 
          error: error => console.error(error)});
      }
    }
  }

}
