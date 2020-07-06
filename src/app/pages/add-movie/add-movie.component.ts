import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieStoreService } from '../../shared/services/movie-store.service';
import { Observable, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Movie } from '../../shared/movies.model';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  addMovie: FormGroup;

  constructor(private fb: FormBuilder, public movieStore: MovieStoreService, private router: Router) {

    this.addMovie = fb.group({
      movieTitle : [null, Validators.required],
      movieReleaseDate : [(new Date()).toISOString(), Validators.required],
      movieImage : [null, Validators.required],
      movieDescription : [null]
    });

  }

  ngOnInit(): void {
  }

  onFormAdd(form: Movie): void {
    if (this.addMovie.valid) {
      this.movieStore.addMovie(form);
      this.router.navigate(['home']);
    }
  }

  onImageFile(imageInput: any): void {
    if (imageInput.length > 0) {
      const fileReader = new FileReader();
      const imageToUpload = imageInput[0];
      this.imageToBase64(fileReader, imageToUpload)
        .subscribe(base64image => {
          this.addMovie.controls.movieImage.setValue(base64image);
        });
    }
  }

  imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
    fileReader.readAsDataURL(fileToRead);
    return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
  }

}
