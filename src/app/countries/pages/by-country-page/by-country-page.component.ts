import { Component } from '@angular/core';
import { Country } from '../../interfaces/country-interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public lastSearchedTerm: string = '';

  constructor (private countryService: CountryService) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStorage.byCountry.countries;
    this.lastSearchedTerm = this.countryService.cacheStorage.byCountry.valueSearched;
  }

  public searchByCountry(countryValue: string): void {
    this.isLoading = true;
    this.countryService.searchByCountry(countryValue).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    })
  }
}
