import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CountriesTableComponent } from './components/countries-table/countries-table.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    SidebarComponent,
    ContactComponent,
    SearchBoxComponent,
    CountriesTableComponent,
    LoaderComponent,

  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    SidebarComponent,
    ContactComponent,
    SearchBoxComponent,
    CountriesTableComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
