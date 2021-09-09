import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Share module
import { SharedModule } from './../shared/shared.module';
import { SearchCardModule } from './../search-card/search-card.module';

// Routing module
import { DashboardRoutingModule } from './dashboard-routing.module';

// Components
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    SearchCardModule
  ],
  providers: []
})

export class DashboardModule { }
