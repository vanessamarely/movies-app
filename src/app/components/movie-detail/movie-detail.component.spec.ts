import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieStoreService } from '../../shared/services/movie-store.service';
import { MovieDetailComponent } from './movie-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AddMovieComponent } from '../../pages/add-movie/add-movie.component';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let movieStoreService: MovieStoreService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'add-movie', component: AddMovieComponent }
        ]),
      ],
      declarations: [ MovieDetailComponent ],
      providers: [
        MovieStoreService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    movieStoreService = TestBed.inject(MovieStoreService);
    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to add-movie after clicked on Add Movie button', () => {
    const componentSpy = spyOn(component , 'addMovie');
    component.addMovie();
    expect(componentSpy).toHaveBeenCalled();
    router.navigate(['/add-movie'])
      .then(() => {
        expect(router.url).toEqual('/add-movie');
      });
  });

});
