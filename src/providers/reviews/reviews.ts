import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';
import {DOCUMENT} from '@angular/platform-browser';


/*
  Generated class for the ReviewsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ReviewsProvider {

  data: any;
  domain: string;

  constructor(@Inject(DOCUMENT) private document, public http: Http) {
    console.log('Hello ReviewsProvider Provider1');
    this.domain = this.document.location.hostname;
  }

  getReviews(){

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('http://'+this.domain+'/api/reviews')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

  }

  createReview(review){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/api/reviews', JSON.stringify(review), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });

  }

  deleteReview(id){

    this.http.delete('http://localhost:8080/api/reviews/' + id).subscribe((res) => {
      console.log(res.json());
    });

  }

}
