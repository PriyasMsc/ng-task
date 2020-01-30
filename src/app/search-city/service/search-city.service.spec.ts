import { TestBed } from '@angular/core/testing';

import { SearchCityService } from './search-city.service';

describe('SearchCityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchCityService = TestBed.get(SearchCityService);
    expect(service).toBeTruthy();
  });
});
