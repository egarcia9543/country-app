import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, pipe, tap } from 'rxjs';
import { CacheStorage, Country } from '../interfaces/country-interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStorage: CacheStorage = {
    byCapital: {valueSearched: '', countries: []},
    byCountry: {valueSearched: '', countries: []},
    byRegion: {valueSearched: '', countries: []}
  };

  constructor(private httpClient: HttpClient) {
    this.getFromLocalStorage();
  }

  private saveInLocalStorage(): void {
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStorage));
  }

  private getFromLocalStorage(): any {
    if (localStorage.getItem('cacheStorage')) {
      this.cacheStorage = JSON.parse(localStorage.getItem('cacheStorage')!);
    }
    return;
  }

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
    //Retornamos un observable vacío en caso de error en la petición
      .pipe(
        catchError(() => of([])),
        //Operador rxjs
        delay(2000)
      )
  }

  public searchCountryByCode(code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0]: null)
      );
  }

  public searchByCapital(capitalValue: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${capitalValue}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStorage.byCapital = {valueSearched: capitalValue, countries}),
        tap(() => this.saveInLocalStorage())
      );
  }

  public searchByCountry(countryValue: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${countryValue}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStorage.byCountry = {valueSearched: countryValue, countries}),
        tap(() => this.saveInLocalStorage())
      );
  }

  public searchByRegion(regionValue: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/region/${regionValue}`)
    .pipe(
      catchError(() => of([])),

      tap(countries => this.cacheStorage.byRegion = {valueSearched: regionValue, countries}),
      tap(() => this.saveInLocalStorage())
    )
  }
}
