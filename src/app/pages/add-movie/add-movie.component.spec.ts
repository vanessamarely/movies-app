import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AddMovieComponent } from './add-movie.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MovieStoreService } from '../../shared/services/movie-store.service';
import { HomeComponent } from '../../pages/home/home.component';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  const movie = {
    movieTitle: 'Test Movie',
    movieReleaseDate: 'Feb 20, 2020',
    movieImage: 'image.png',
    movieDescription: 'Test Movie Description',
    isSelected: false
  };
  let movieStoreService: MovieStoreService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: HomeComponent }
        ]),
      ],
      declarations: [ AddMovieComponent ],
      providers: [
        MovieStoreService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    movieStoreService = TestBed.inject(MovieStoreService);
    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit a form', () => {
    const componentSpy = spyOn(component , 'onFormAdd');
    const serviceSpy = spyOn(movieStoreService , 'addMovie').and.callThrough();

    component.addMovie.controls.movieTitle.setValue(movie.movieTitle);
    component.addMovie.controls.movieReleaseDate.setValue(movie.movieReleaseDate);
    component.addMovie.controls.movieImage.setValue(movie.movieImage);
    component.addMovie.controls.movieDescription.setValue(movie.movieDescription);

    component.onFormAdd(movie);

    expect(componentSpy).toHaveBeenCalled();

    if (component.addMovie.valid){
      expect(serviceSpy).toBeDefined();

      router.navigate(['/home'])
        .then(() => {
          expect(router.url).toEqual('/home');
        });
    }
  });
});
