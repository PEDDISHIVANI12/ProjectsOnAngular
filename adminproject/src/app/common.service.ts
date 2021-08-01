import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: Http) { }

  deleteUser(id: any) {
    return this.http.post('http://localhost:8082/api/deleteUser/', { 'id': id })
      .map((response: Response) => response.json());
  }
  
  GetUser() {
    return this.http.get('http://localhost:8082/api/getUser/')
      .map((response: Response) => response.json());
  }
  GetUserCustomers() {
    return this.http.get('http://localhost:8081/api/getUser_customer/')
      .map((response: Response) => response.json());
  }
  GetPaymentList() {
    return this.http.get('http://localhost:8091/api/getUser/')
      .map((response: Response) => response.json());
  }

  UpdateUser(data:any) {
    console.log(data);
    return this.http.post('http://localhost:8082/api/UpdateUser/',data)
      .map((response: Response) => response.json());

  }

  updateadmin(data:any) {
    console.log(data);
    return this.http.post('http://localhost:8087/api/UpdateUser/',data)
      .map((response: Response) => response.json());

  }

  getadmin() {
    return this.http.get('http://localhost:8087/api/getUser/')
    .map((response: Response) => response.json());
  }


}
