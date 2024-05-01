import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input() public input_placeholder: string = '';
  @Input() public input_value: string = '';
  @Output() onDebounce = new EventEmitter<string>();
  @ViewChild('SearchBox') inputValue!: ElementRef<HTMLInputElement>;

  private debouncer: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.debouncer
    //Esto se ejecuta cada un segundo después de que el usuario deje de escribir
    .pipe(debounceTime(1000))
    .subscribe((value) => {
      this.onDebounce.emit(value);
    });
  }

  // Debounce the search
  onKeyPress(searchValue: string): void {
    this.debouncer.next(searchValue);
  }

  //Cada que se destruya el componente se desuscribe del observable
  //a excepción de las peticiones http debemos desuscribirnos de los observables
  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }
}
