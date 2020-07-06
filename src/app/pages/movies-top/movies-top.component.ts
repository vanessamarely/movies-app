import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../../shared/services/movie-api.service';
import { Movie } from '../../shared/movies.model';

@Component({
  selector: 'app-movies-top',
  templateUrl: './movies-top.component.html',
  styleUrls: ['./movies-top.component.scss']
})
export class MoviesTopComponent implements OnInit {
  public moviesList: Movie[];
  constructor(public movieApi: MovieApiService) {
    this.moviesList = null;
  }

  ngOnInit(): void {
    this.movieApi
      .getResponse()
      .subscribe(
        (response: Movie[]) => {
          this.setData(response);
        },
        (error: any) => (console.log('Ups! we have an error: ', error))
      );
  }

  setData(data: any): void {
    if (data.hasOwnProperty('movies')){
      const { movies } = data;
      this.moviesList = movies.map(value => ({
        movieTitle: value.title,
        movieReleaseDate: value.release,
        movieImage: value.image,
        description: value.description
      }));
    }
  }

}
