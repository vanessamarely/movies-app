import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieStoreService } from '../../shared/services/movie-store.service';
import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  const movie = {
    movieTitle: 'Test Movie',
    movieReleaseDate: 'Feb 20, 2020',
    movieImage: 'image.png',
    movieDescription: 'Test Movie Description',
    isSelected: false
  };
  let movieStoreService: MovieStoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesListComponent ],
      providers: [
        MovieStoreService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    movieStoreService = TestBed.inject(MovieStoreService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectedMovie function', () => {
    const serviceSpy = spyOn(movieStoreService , 'setSelectedMovie').and.callThrough();
    component.selectedMovie(movie);
    expect(serviceSpy).toHaveBeenCalled();
  });
});
