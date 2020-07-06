import { Component, Input, OnInit } from '@angular/core';
import { MovieStoreService } from '../../services/movie-store.service';
import { Movie } from '../../movies.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  @Input() isListed: boolean;
  @Input() isTop: boolean;
  @Input() movie: Movie;

  constructor(public movieStore: MovieStoreService) { }

  ngOnInit(): void {
  }

  removeMovie(movie: Movie): void {
    this.movieStore.removeMovie(movie);
  }

  getUrl(image: string): string {
    return `url(${image})`;
  }

}
