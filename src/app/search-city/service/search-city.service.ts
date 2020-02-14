import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SearchCityService {
  private API_URL = environment.API_URL;
  private city: Observable<any> = null;
  public cityCache = new Map();

  constructor(private http: HttpClient) {}

  getAddress(searchCity) {
    const dataFromCache = this.cityCache.get(
      this.API_URL + 'json?sensor=false&address=' + searchCity
    );

    if (dataFromCache) {
      return of(dataFromCache);
    }
    if (!dataFromCache) {
      this.city = this.http
        .get(this.API_URL + 'json?sensor=false&address=' + searchCity)
        .pipe(shareReplay(1));

      this.city.subscribe(data =>
        this.cityCache.set(
          this.API_URL + 'json?sensor=false&address=' + searchCity,
          data
        )
      );
      return this.city;
    }
  }
}
