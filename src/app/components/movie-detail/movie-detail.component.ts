import { Component, OnInit } from '@angular/core';
import { MovieStoreService } from '../../shared/services/movie-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  constructor(public movieStore: MovieStoreService, private router: Router) { }

  ngOnInit(): void {
  }

  addMovie(): void {
    this.router.navigate(['add-movie']);
  }

}
