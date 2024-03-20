import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {
  constructor(private countryService: CountryService) {}

  searchByCapital(value: string):void {
    this.countryService.searchByCapital(value).subscribe(capital => {
      console.log(capital);
    })
  }
}
