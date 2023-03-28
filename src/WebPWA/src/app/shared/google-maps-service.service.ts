import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsServiceService {

  constructor(private http: HttpClient) { }
 
  getLocation(){
    let apiKey='AIzaSyDeSstWpd_sNjbN1J3hU6yRKfmcMse9M0g'
    return this.http.get('http://api.ipapi.com/api/check?access_key='+apiKey);
  }
}
