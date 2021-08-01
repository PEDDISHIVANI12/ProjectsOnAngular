import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonService } from './common.service';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  errorMessage: any;
  constructor(private newService: CommonService,private router:Router) { }
  
  
  ngOnInit(): void {
    

  }
  admin(){
    this.router.navigate(['admin']);
  }
  List(){
    this.router.navigate(['customer']);
  }
  budget(){
    this.router.navigate(['budget']);

  }
}
