import { TestBed } from '@angular/core/testing';

import { MovieStoreService } from './movie-store.service';

describe('MovieStoreService', () => {
  let service: MovieStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
