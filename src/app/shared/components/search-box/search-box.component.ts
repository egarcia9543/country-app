import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  @Input() public input_placeholder: string = '';
  @Output() onSearch: EventEmitter<string> = new EventEmitter();
  @ViewChild('SearchBox') inputValue!: ElementRef<HTMLInputElement>;

  public search(): void {
    this.onSearch.emit(this.inputValue.nativeElement.value);
  }
}
