import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchCityService } from './service/search-city.service';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit {
  constructor(private searchCityService: SearchCityService) {}
  geoResult: any;
  latitude: number;
  longitude: number;
  addressComponents: string;
  spinner: boolean;

  ngOnInit() {}
  onSubmit(form: NgForm) {
    this.spinner = true;

    this.searchCityService.getAddress(form.value.city).subscribe(data => {
      this.geoResult = data;
      if (this.geoResult.status === 'OK') {
        this.latitude = this.geoResult.results[0].geometry.location.lat;
        this.longitude = this.geoResult.results[0].geometry.location.lng;
        this.addressComponents = this.geoResult.results[0].address_components[0].long_name;
        this.spinner = false;
      } else {
        this.spinner = false;
        this.latitude = null;
        this.longitude = null;
        this.addressComponents = null;
      }
    });
  }
}
