import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesTopComponent } from './movies-top.component';
import { MovieApiService } from '../../shared/services/movie-api.service';

describe('MoviesTopComponent', () => {
  let component: MoviesTopComponent;
  let fixture: ComponentFixture<MoviesTopComponent>;
  let movieApiService: MovieApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ MoviesTopComponent ],
      providers: [
        MovieApiService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    movieApiService = TestBed.inject(MovieApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setData function', () => {
    const componentSpy = spyOn(component , 'setData');
    const movie = {
      title: 'Test Movie',
      release: 'Feb 20, 2020',
      image: 'image.png',
      description: 'Test Movie Description'
    };
    component.setData(movie);
    expect(componentSpy).toHaveBeenCalled();
  });

  it('should load movies service data', () => {
    spyOn(movieApiService, 'getResponse').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(movieApiService.getResponse).toHaveBeenCalled();
  });
});
