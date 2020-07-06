import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { MovieApiService } from './movie-api.service';

describe('MovieApiService', () => {
  let service: MovieApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(MovieApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects service to fetch data', () => {
    const movie = {
      title: 'Test Movie',
      release: 'Feb 20, 2020',
      image: 'image.png',
      description: 'Test Movie Description'
    };
    const url = 'http://www.mocky.io/v2/5dc3c053300000540034757b';

    service.getResponse()
      .subscribe(movieData => {
        expect(movieData[0].title).toEqual(movie.title);
        expect(movieData[0].image).toEqual(movie.image);
        expect(movieData[0].description).toEqual(movie.description);
        expect(movieData[0].release).toEqual(movie.release);
      });

    const req = httpTestingController.expectOne(
      request => request.method === 'GET' && request.url === url
    );
    req.flush([movie]);
  });
});
