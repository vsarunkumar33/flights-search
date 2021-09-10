import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

// Services
import { SearchCardService } from './search-card.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss']
})
export class SearchCardComponent implements OnInit {

  @Input() searchData: any;
  @Output() btnClick = new EventEmitter();

  form: FormGroup;
  formSubmitted: boolean;

  minStartDate: any;
  maxStartDate: any;
  minReturnDate: any;

  travelType: number; // 0 -> return  1 -> one way

  placeList: string[] = [];
  filteredOptionsFrom: Observable<string[]>;
  filteredOptionsTo: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private router: Router,
    private searchCardService: SearchCardService
  ) {
    this.form = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      returnDate: ['', [Validators.required]],
      passengerCount: ['', [Validators.required]],
      type: [0]
    }, {
      validator: NotMatch('from', 'to')
    });
  }

  ngOnInit(): void {
    this.setInitialFormData();
    this.setFormValue();
    this.getFlightList();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.searchData)
    if (this.searchData && changes.searchData) {
      this.setFormValue();
    }
  }

  getFlightList(): void {
    this.searchCardService.getPlaceList()
      .subscribe((res: any) => {
        this.placeList = res;
        console.log('resss ', res);
        this.filterFromToOption();
      });
  }

  setFormValue(): void {
    if (this.searchData) {
      this.f.from.setValue(this.searchData.from);
      this.f.to.setValue(this.searchData.to);
      this.f.type.setValue(this.searchData.type);
      setTimeout(() => {
        this.travelType = this.searchData.type;
        this.f.startDate.setValue(this.searchData.startDate);
        this.f.returnDate.setValue(this.searchData.returnDate);
        this.f.passengerCount.setValue(this.searchData.passengerCount);
        if (this.searchData.type != 0) {
          this.f.returnDate.setValue('');
          this.f.returnDate.setValidators([]);
          this.f.returnDate.updateValueAndValidity();
        }
      })
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;
    console.log('this.form    ', this.form.value);
    const data = this.form.value;
    if (this.form.valid) {
      this.formSubmitted = false;
      const qParams = this.setQueryParams();
      window.scrollTo(0, 0);
      this.btnClick.emit('');
      this.router.navigate([`/search`], { queryParams: qParams});
    } else {
      const input: any = document.querySelector('#search-form .ng-invalid');
      input.focus();
    }
  }

  setQueryParams() {
    const qParams = {};

    qParams['from'] = this.f.from.value;
    qParams['to'] = this.f.to.value;
    qParams['startDate'] = this.changeDateFormat(this.f.startDate.value);
    if (this.f.returnDate.value) {
      qParams['returnDate'] = this.changeDateFormat(this.f.returnDate.value);
    }
    qParams['type'] = this.f.type.value;
    qParams['passengerCount'] = this.f.passengerCount.value;

    return qParams;
  }

  setInitialFormData(): void {
    this.travelType = 0;
    this.form.get('type').setValue(0)
    this.setMinMaxDate();
  }

  onChangeTab(event): void {
    console.log(event.index)
    this.travelType = event.index;
    const ctrl = this.form.get('returnDate');
    this.form.get('type').setValue(this.travelType);
    if (this.travelType == 0) {
      ctrl.setValidators([Validators.required]);
    } else {
      ctrl.reset();
      ctrl.setValidators([]);
      this.maxStartDate = '';
    }
    ctrl.updateValueAndValidity();
  }

  setMinMaxDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    this.minStartDate = new Date(+year, +month, +day, 0, 0);
    this.maxStartDate = '';
    this.minReturnDate = this.minStartDate;
  }

  onChangeStartDate(date) {
    if (!date) return;
    const mDate = this.changeDateFormat(date);
    const splitDate = mDate.split('-')

    this.minReturnDate = new Date(+splitDate[0], +splitDate[1]-1, +splitDate[2], 0, 0);
  }

  onChangeReturnDate(date) {
    if (!date) return;
    const mDate = this.changeDateFormat(date);
    const splitDate = mDate.split('-')

    this.maxStartDate = new Date(+splitDate[0], +splitDate[1]-1, +splitDate[2], 23, 0);
  }

  changeDateFormat(value) {
    try {
      const latestDate = this.datepipe.transform(value, 'yyyy-MM-dd');
      return latestDate;
    } catch (err) {
      return '';
    }
  }

  filterFromToOption(): void {
    this.filteredOptionsFrom = this.f.from.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredOptionsTo = this.f.to.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.placeList.filter(option => option.toLowerCase().includes(filterValue));
  }

  get f() { return this.form.controls; }

}

export function NotMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.notMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value === matchingControl.value) {
      matchingControl.setErrors({ notMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
