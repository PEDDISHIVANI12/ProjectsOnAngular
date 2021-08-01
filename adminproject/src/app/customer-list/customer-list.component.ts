import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  getlaundryOrders: any;
  errorMessage: any;
  term:any;
  show:boolean = false;
  constructor(private newService:CommonService) { }

  ngOnInit(): void {
    this.newService.GetUserCustomers()
    .subscribe(data => {
    console.log(data);
    this.getlaundryOrders = data;
  }
    , error => this.errorMessage = error)
  }
  calculateDiff(data:any){
    let currentDate = new Date();
    let date = new Date(data);
    let date1 = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) ) /(1000 * 60 * 60 * 24));
    console.log(date1);
    if (date1 < 5){
      return "Active"
    }
    else{
      return "Not Active";
    }
  }

}
