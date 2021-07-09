import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private router:Router) { }
  canlogin = false;
  
  settoken(){
    this.canlogin = true;
  }
  gettoken(){  
    return this.canlogin;  
    }  
}
