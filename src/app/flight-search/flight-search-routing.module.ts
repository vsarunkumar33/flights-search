import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { FlightSearchComponent } from './flight-search.component';

const routes: Routes = [
  {
    path: '',
    component: FlightSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FlightSearchRoutingModule { }
