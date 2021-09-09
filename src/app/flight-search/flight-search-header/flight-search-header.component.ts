import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flight-search-header',
  templateUrl: './flight-search-header.component.html',
  styleUrls: ['./flight-search-header.component.scss']
})
export class FlightSearchHeaderComponent implements OnInit {

  @Output() public openModify = new EventEmitter();
  @Input() searchData: any;

  constructor() { }

  ngOnInit() {
  }

  public openDialog = () => {
    this.openModify.emit();
  }

}
