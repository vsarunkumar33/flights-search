import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

// Services
import { FlightSearchService } from '../flight-search.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {

  @Input() searchData: any;

  allFlightList: any[] = [];
  onwardsFlightList: any[] = [];
  returnFlightList: any[] = [];

  constructor(
    private flightSearchService: FlightSearchService
  ) {
    this.getFlightList();
  }

  ngOnInit(): void {
    this.getFilteredData();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.searchData)
    if (this.searchData && changes.searchData) {
      this.getFilteredData();
    }
  }

  getFlightList(): void {
    this.flightSearchService.getFlightList()
      .subscribe((res: any) => {
        this.allFlightList = res;
        console.log('resss ', res);
        this.getFilteredData();
      });
  }

  getFilteredData(): void {
    this.onwardsFlightList = this.allFlightList.filter(
      ele => {
        if (ele.from.toLowerCase() == this.searchData.from.toLowerCase().trim() &&
          ele.to.toLowerCase() == this.searchData.to.toLowerCase().trim() &&
          ele.date == this.searchData.startDate &&
          ele.passengerCapacity <= this.searchData.passengerCount
        ) {
          return ele
        }
      })

    this.returnFlightList = this.allFlightList.filter(
      ele => {
        if (ele.from.toLowerCase() == this.searchData.from.toLowerCase().trim() &&
          ele.to.toLowerCase() == this.searchData.to.toLowerCase().trim() &&
          ele.date == this.searchData.returnDate &&
          ele.passengerCapacity <= this.searchData.passengerCount.trim()
        ) {
          return ele
        }
      })
    console.log(this.onwardsFlightList)
    console.log(this.returnFlightList)
  }

}
