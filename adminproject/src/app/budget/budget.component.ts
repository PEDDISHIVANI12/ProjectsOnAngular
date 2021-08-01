import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  getlaundryOrders: any = [];
  errorMessage: any;
  totalSum = 0;
  constructor(private newService:CommonService) { }

  ngOnInit(): void {
    this.newService.GetPaymentList()
    .subscribe(data => {
    console.log(data);
    this.getlaundryOrders = data;
    for(var i = 0;i < this.getlaundryOrders.length;i ++){
      this.totalSum = this.getlaundryOrders[i].sum + this.totalSum;
      console.log(this.totalSum);
    }
  }
    , error => this.errorMessage = error)
    
  }

}
