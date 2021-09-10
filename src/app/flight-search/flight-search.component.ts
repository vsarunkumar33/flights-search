import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})

export class FlightSearchComponent implements OnInit {

  searchData: any;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.setQueryParamsFromUrl();
  }

  ngOnInit(): void {
  }

  setQueryParamsFromUrl() {
    this.route.queryParams.subscribe(params => {
      this.searchData = {
        from: params['from'] || '',
        to: params['to'] || '',
        startDate: params['startDate'] || '',
        returnDate: params['returnDate'] || '',
        passengerCount: params['passengerCount'] || '',
        type: params['type'] || '',
      };
    });
  }

  openDialog(event): void {
    const dialogRef = this.dialog.open(ModifyDialog, {
      width: '830px',
      data: {searchData: this.searchData}
    });
    dialogRef.componentInstance.searchData = this.searchData;

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }

}



@Component({
  selector: 'modify-dialog',
  templateUrl: 'modify-dialog.html',
})

export class ModifyDialog {

  searchData: any;

  constructor(
    public dialogRef: MatDialogRef<ModifyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onBtnClick(event): void {
    this.dialogRef.close();
  }

}
