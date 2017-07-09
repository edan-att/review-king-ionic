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
  reviews_url: string;

  constructor(@Inject(DOCUMENT) private document, public http: Http) {
    console.log('Hello ReviewsProvider Provider1');
    let domain = this.document.location.hostname;
    this.reviews_url = 'http://'+ domain +'/api/reviews'
  }

  getReviews(){

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get(this.reviews_url)
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

    this.http.post(this.reviews_url, JSON.stringify(review), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });

  }

  deleteReview(id){

    this.http.delete(this.reviews_url+ '/' + id).subscribe((res) => {
      console.log(res.json());
    });

  }

}
