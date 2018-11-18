import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class SentimentAnalysisService {

   base_url:string='http://www.fueleconomy.gov/ws/rest';

  constructor(private http: Http) { }

  searchByYear(year: string): Promise<any> {

   return new Promise((resolve, reject) => {
      this.http.get(this.base_url + '/vehicle/menu/make?year='+year)
      //map(res => res.json().menuItem)
      //.map(res => this.wrapInArray(res))
      .subscribe(data => resolve(data), err => reject(err));
   });
}

}
