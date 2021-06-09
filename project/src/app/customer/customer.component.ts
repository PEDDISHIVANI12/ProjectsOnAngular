import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  errorMessage: any;

  constructor(private newService:CommonService,private router:Router) { }
  valbutton:any;
  user:any;
  users :any;
  ngOnInit(): void {
    this.user = this.newService.getUserId()._id;
    this.newService.getPrices(this.user)
    .subscribe((data:any) => {
      this.users = data.data;
      this.valbutton = this.users.status;
      console.log(this.users);
    }
      , (error: any) => this.errorMessage = error)
  }
 

  Prices(prices:any){
    console.log(this.users);
    prices._id = this.users.data._id;
    prices.status = "Update";
    this.valbutton = prices.status;
    prices.laund_id = this.newService.getUserId()._id;
    console.log(prices);
    this.newService.updatePrices(prices)
      .subscribe((data:any) => {
        console.log(data);
        alert(data.data);
        //this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)
  }
    //this.valbutton = "Update"
  
}
