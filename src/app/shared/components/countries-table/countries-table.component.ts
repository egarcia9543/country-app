import { Component, Input } from '@angular/core';
import { Country } from '../../../countries/interfaces/country-interface';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrl: './countries-table.component.css'
})
export class CountriesTableComponent {
  @Input() public countries: Country[] = []
}
