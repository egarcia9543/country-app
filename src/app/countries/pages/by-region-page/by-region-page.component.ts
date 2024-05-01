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
  public isLoading: boolean = false;
  public regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion: string = '';

  constructor (private countryService: CountryService) {};

  ngOnInit(): void {
    this.selectedRegion = this.countryService.cacheStorage.byRegion.valueSearched;
    this.countries = this.countryService.cacheStorage.byRegion.countries;
  };

  public searchByRegion(regionValue: string): void {
    this.selectedRegion = regionValue;
    this.isLoading = true;
    this.countryService.searchByRegion(regionValue).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  };
};
