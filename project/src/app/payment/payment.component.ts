import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  show:boolean = false;
  details: any;
  errorMessage: any;
  paymentmode : any;
  orders: any;
  currentDate = new Date();
  pickup:any;
  constructor(private newService: CommonService,private router: Router) { }

  ngOnInit(): void {
    this.newService.getDetails1().subscribe((data : any) => {
      this.details = data;
    });   
    this.newService.getorder().subscribe((data : any) => {
      this.orders = data;
    });
    for (let i = 0; i < this.orders.length; i++) {
      this.orders[i][2] = Number(this.orders[i][2]);
      this.orders[i][3] = Number(this.orders[i][3]);
    }
  }
  paycard(){
    this.show = true;
    this.paymentmode = "card";
  }
  paycash(){
    this.show = false;
    this.paymentmode = "cash";
  }
  payment(data:any){
    data.cus_id = this.newService.getUserId()._id;
    data.order = this.newService.getorder();
    data.paymentmode = this.paymentmode;
    this.newService.Payment(data)
      .subscribe((data:any) => {
        alert(data.data);
        this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)
  }


}
