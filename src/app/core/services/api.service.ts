import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers = new HttpHeaders();
  private json: any;

  constructor(private httpClient: HttpClient) { }

  call(data: any, route: any, method: any): Observable<any> {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    switch (method.toUpperCase()) {
      case 'GET':
        return this.httpClient.get(environment.apiUrl + route, { headers: this.headers });
      case 'POST':
        if (data != null) {
          this.json = JSON.stringify(data);
          return this.httpClient.post(environment.apiUrl + route, this.json, { headers: this.headers });
        } else {
          this.json = {};
          return this.httpClient.post(environment.apiUrl + route, this.json, { headers: this.headers });
        }
      default:
        return this.httpClient.post(environment.apiUrl + route, this.json, { headers: this.headers });
    }
  }
}
