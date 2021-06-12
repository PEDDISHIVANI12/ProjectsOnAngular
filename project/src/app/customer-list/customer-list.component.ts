import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { O_DIRECTORY } from 'constants';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  getlaundryOrders: any;
  errorMessage: any;
  term = this.newService.getlaundryname();
  orderstatus: any;
  orders: any;
  status: any;
  constructor(private newService: CommonService,private router: Router) { }
  ngOnInit(): void {
    this.newService.GetUser_payment()
    .subscribe(data => {
    console.log(data);
    this.getlaundryOrders = data;
  }
    , error => this.errorMessage = error)
    
  }
  
  update(event: any,order:any){
    console.log(event.target.value);
    order.status = event.target.value;
    this.newService.UpdateUserPayment(order)
    .subscribe((data:any) => {
      console.log(data);
      alert(data.data);
     // this.ngOnInit();
    }
      , (error: any) => this.errorMessage = error)
}
  
  show(data:any){
    this.orders = data.order;
    console.log(this.orders);
  }
  into(order:any){
    console.log(order);
  }

}
