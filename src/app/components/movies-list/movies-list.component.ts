import { Component, OnInit } from '@angular/core';
import { MovieStoreService } from '../../shared/services/movie-store.service';
import { Movie } from '../../shared/movies.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  constructor(public movieStore: MovieStoreService) { }

  ngOnInit(): void {
  }

  selectedMovie(movie: Movie): void {
    this.movieStore.setSelectedMovie(movie);
  }

}
