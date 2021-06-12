import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-yourorders',
  templateUrl: './yourorders.component.html',
  styleUrls: ['./yourorders.component.css']
})
export class YourordersComponent implements OnInit {
  getresult1: any;
  errorMessage: any;
index = 0;
  showingstatus: boolean = false;
  order: any;
  selecting: any;
  constructor(private newService: CommonService) { }
  getlaundryOrders:any;
  orders:any;
  term = this.newService.getUserId().email_cus;
  ngOnInit(): void {
    this.newService.GetUser_payment()
    .subscribe(data => {
    console.log(data);
    this.getlaundryOrders = data;
  }
    , error => this.errorMessage = error)

  }
  show(data:any){
    this.orders = data.order;
    console.log(this.orders);
  }
  showstatus(order:any){
    this.order = order;
    this.selecting = order.status;
    console.log(order.status);
    this.showingstatus = true;
  }
  closestatus(){
    this.showingstatus = false;
  }

}
