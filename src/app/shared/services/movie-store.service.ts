import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../movies.model';

@Injectable({
  providedIn: 'root'
})
export class MovieStoreService {
  private readonly moviesList = new BehaviorSubject<Movie[]>([]);
  readonly movies$ = this.moviesList.asObservable();
  private readonly selectedMovie = new BehaviorSubject<Movie>(null);
  readonly selectedMovie$ = this.moviesList.asObservable();
  readonly getMoviesList$ = this.movies$.pipe(
    map(movies => movies)
  );

  constructor() { }

  get movies(): Movie[] {
    return this.moviesList.getValue();
  }

  set movies(value: Movie[]) {
    this.moviesList.next(value);
  }

  setSelectedMovie(data: Movie): void {
    this.setNewValue(this.selectedMovie.getValue(), false);
    this.setNewValue(data, true);
  }

  setNewValue(data: any, isSelected: boolean): void {
    const index = this.movies.indexOf(data);
    if (data !== null){
      this.movies[index] = {
      ...data,
      isSelected
      };
    }
    else{
      this.movies[index] = null;
    }
    this.selectedMovie.next(this.movies[index]);
  }

  getSelected(): Movie {
    return this.selectedMovie.getValue();
  }

  addMovie(data: Movie): void  {
    const tmpMovie = data;
    this.movies = [
      ...this.movies,
      tmpMovie
    ];
  }

  removeMovie(data: Movie): void {
    this.movies = this.movies.filter(movie => movie.movieTitle !== data.movieTitle);
    this.setSelectedMovie(null);
  }
}
