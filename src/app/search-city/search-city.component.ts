import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SearchCityService } from './service/search-city.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit, OnDestroy {
  private formSubscription: Subscription;
  geoResult: any;
  latitude: number;
  longitude: number;
  addressComponents: string;
  spinner: boolean;
  searchForm;

  constructor(
    private searchCityService: SearchCityService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = formBuilder.group({
      city: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.searchForm.get('city').valueChanges.subscribe(val => {
      this.forceReload();
    });
    if (this.searchForm.valid) {
      this.spinner = true;
      this.formSubscription = this.searchCityService
        .getAddress(this.searchForm.value.city)
        .subscribe(data => {
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
    } else {
      alert('Enter city');
    }
  }
  forceReload() {
    this.searchCityService.forceReload();
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
