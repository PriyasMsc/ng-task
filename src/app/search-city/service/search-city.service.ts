import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SearchCityService {
  private API_URL = environment.API_URL;
  private city: Observable<any> = null;
  private reload = new Subject();

  constructor(private http: HttpClient) {}

  getAddress(searchCity) {
    // return this.http.get('/api/json?sensor=false&address=' + city);
    // return this.http.get(this.API_URL + 'json?sensor=false&address=' + city);

    if (!this.city) {
      this.city = this.http
        .get(this.API_URL + 'json?sensor=false&address=' + searchCity)
        .pipe(takeUntil(this.reload), shareReplay(1));
    }
    return this.city;
  }
  forceReload() {
    this.reload.next();
    this.city = null;
  }
}
