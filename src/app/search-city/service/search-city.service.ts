import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SearchCityService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getAddress(city) {
    // return this.http.get('/api/json?sensor=false&address=' + city);
    return this.http.get(this.API_URL + 'json?sensor=false&address=' + city);
  }
}
