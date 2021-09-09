import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Share module
import { SharedModule } from './../shared/shared.module';
import { SearchCardModule } from './../search-card/search-card.module';

// Routing module
import { FlightSearchRoutingModule } from './flight-search-routing.module';

// Services
import { FlightSearchService } from './flight-search.service';
import { DatePipe } from '@angular/common';

// Components 
import { FlightSearchComponent } from './flight-search.component';
import { ModifyDialog } from './flight-search.component';
import { FlightSearchHeaderComponent } from './flight-search-header/flight-search-header.component';
import { FlightListComponent } from './flight-list/flight-list.component';


@NgModule({
  declarations: [
    FlightSearchComponent,
    ModifyDialog,
    FlightSearchHeaderComponent,
    FlightListComponent
  ],
  imports: [
    CommonModule,
    FlightSearchRoutingModule,
    SharedModule,
    SearchCardModule
  ],
  providers: [
    DatePipe,
    FlightSearchService
  ]
})

export class FlightSearchModule { }
