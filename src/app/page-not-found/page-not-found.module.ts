import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing module
import { PageNotFoundRoutingModule } from './page-not-found-routing';

//Components
import { PageNotFoundComponent } from './page-not-found.component';



@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule
  ]
})
  
export class PageNotFoundModule { }
