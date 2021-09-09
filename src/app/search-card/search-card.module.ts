import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCardComponent } from './search-card.component';


// Share module
import { SharedModule } from './../shared/shared.module';

// Services
import { SearchCardService } from './search-card.service';
import { DatePipe } from '@angular/common';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [SearchCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    SearchCardComponent
  ],
  providers: [
    DatePipe,
    SearchCardService
  ]
})

export class SearchCardModule { }
