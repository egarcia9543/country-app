import { Component } from '@angular/core';
import { Country } from '../../interfaces/country-interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {
  public countries: Country[] = [];

  constructor (private countryService: CountryService) {};

  public searchByRegion(regionValue: string): void {
    this.countryService.searchByRegion(regionValue).subscribe(countries => {
      this.countries = countries;
    });
  };
};
