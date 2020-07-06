import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MovieStoreService } from '../../services/movie-store.service';
import { MovieItemComponent } from './movie-item.component';

describe('MovieItemComponent', () => {
  let component: MovieItemComponent;
  let fixture: ComponentFixture<MovieItemComponent>;
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
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ MovieItemComponent ],
      providers: [ MovieStoreService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieItemComponent);
    component = fixture.componentInstance;
    component.movie = movie;
    component.isTop = false;
    component.isListed = false;
    fixture.detectChanges();

    movieStoreService = TestBed.inject(MovieStoreService);
  });

  it('should instantiate', () => {
    expect(component).toBeTruthy();
  });


  it('should remove movie', () => {
    const serviceSpy = spyOn(movieStoreService , 'removeMovie').and.callThrough();
    component.removeMovie(component.movie);
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should get URL image movie', () => {
    const image = 'image.png';
    const componentSpy = spyOn(component , 'getUrl');
    component.getUrl(image);
    expect(componentSpy).toHaveBeenCalled();
  });

  it('should render movie Info', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain(component.movie.movieTitle);
    expect(compiled.querySelector('mat-card-subtitle span').textContent).toContain(component.movie.movieReleaseDate);
    expect(compiled.querySelector('img').src).toContain(component.movie.movieImage);
    expect(compiled.querySelector('mat-card-content p').textContent).toContain(component.movie.movieDescription);
  });

  it('should not render movie info if this is null', () => {
    const compiled = fixture.nativeElement;
    component.movie = null;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('');
    expect(compiled.querySelector('mat-card-subtitle span').textContent).toContain('');
    expect(compiled.querySelector('img').src).toContain('');
    expect(compiled.querySelector('mat-card-content p').textContent).toContain('');
  });
});
