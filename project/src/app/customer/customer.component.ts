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
  valbutton ="Save";
  user:any;

  ngOnInit(): void {
    this.user = this.newService.getUserId();
  }
  nav(){
    this.router.navigate(['Update']);
  }
  change(){
    this.router.navigate(['change']);
  }

  Prices(prices:any){
    prices.laund_id = this.newService.getUserId()._id;
    this.newService.savePrices(prices)
      .subscribe((data:any) => {
        console.log(prices);
        alert(data.data);
        this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)
    //this.valbutton = "Update"
  }
  update(data:any){
    this.newService.UpdateUser(data)
      .subscribe((data:any) => {
        console.log(data);
        alert(data.data);
        this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)
  }
}
