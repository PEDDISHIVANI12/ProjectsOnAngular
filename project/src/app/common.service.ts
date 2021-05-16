import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: Http) { }
  
  saveUser(user: any) {
    return this.http.post('http://localhost:8082/api/SaveUser/', user).map((response: Response) => response.json());
  }

  saveUser_customer(user: any) {
    return this.http.post('http://localhost:8081/api/SaveUser_customer/', user).map((response: Response) => response.json());
  }

  deleteUser(id: any) {
    return this.http.post('http://localhost:8082/api/deleteUser/', { 'id': id })
      .map((response: Response) => response.json());
  }
  
  GetUser() {
    return this.http.get('http://localhost:8082/api/getUser/')
      .map((response: Response) => response.json());
  }

  isPresentLaundry(data:any){
    return this.http.post('http://localhost:8082/api/isPresent/',{'email_forgot':data})
      .map((response: Response) => response.json());
  }

  isPresentCustomer(data:any){
    return this.http.post('http://localhost:8081/api/isPresent/',{'email_forgot':data})
      .map((response: Response) => response.json());
  }

  UpdateUser(data:any) {
    console.log(data);
    return this.http.post('http://localhost:8082/api/UpdateUser/',data)
      .map((response: Response) => response.json());

  }

  UpdateUser_Customer(data:any) {
    console.log(data);
    return this.http.post('http://localhost:8081/api/UpdateUser/',data)
      .map((response: Response) => response.json());

  }

  login(data:any) {
    console.log(data);
    return this.http.post('http://localhost:8082/api/islogin/',{'email':data.email,'password':data.password,'secques':data.secques,'secans':data.secans})
      .map((response: Response) => response.json());

  }

  loginCustomer(data:any) {
    console.log(data);
    return this.http.post('http://localhost:8081/api/islogin/',{'email':data.email,'password':data.password,'secques':data.secques,'secans':data.secans})
      .map((response: Response) => response.json());

  }


  GetUser_customer() {
    return this.http.get('http://localhost:8081/api/getUser_customer/')
      .map((response: Response) => response.json());
  }
}
