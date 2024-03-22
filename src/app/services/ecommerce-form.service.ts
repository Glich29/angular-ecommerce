import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EcommerceFormService {

  constructor() { }

  getCreditCardMonths(starMonth: number): Observable<number[]> {
    let data: number[] = [];
    //loop until month number 12
    for (let theMonth = starMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const starYear: number = new Date().getFullYear();
    const endYear: number = starYear + 10;
    //loop until month number 12
    for (let theYear = starYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}
