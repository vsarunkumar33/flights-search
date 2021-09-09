import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { FlightSearchModule } from './flight-search/flight-search.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  }, {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'search',
    loadChildren: './flight-search/flight-search.module#FlightSearchModule'
  },
  {
    path: '**',
    loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
