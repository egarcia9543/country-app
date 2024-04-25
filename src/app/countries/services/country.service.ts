import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country-interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  constructor(private httpClient: HttpClient) { }

  public searchCountryByCode(code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0]: null)
      );
  }

  public searchByCapital(capitalValue: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/capital/${capitalValue}`)
      .pipe(
        catchError(() => of([]))
      );
  }

  public searchByCountry(countryValue: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/name/${countryValue}`)
    //Retornamos un observable vacío en caso de error en la petición
    .pipe(
      catchError(() => of([]))
    )
  }

  public searchByRegion(regionValue: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/region/${regionValue}`)
    .pipe(
      catchError(() => of([]))
    )
  }
}
