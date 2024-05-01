import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country-interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public lastSearchedTerm: string = '';

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStorage.byCapital.countries;
    this.lastSearchedTerm = this.countryService.cacheStorage.byCapital.valueSearched;
  }

  searchByCapital(value: string):void {
    this.isLoading = true;
    this.countryService.searchByCapital(value).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  };
};
