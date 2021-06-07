import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-add2cart',
  templateUrl: './add2cart.component.html',
  styleUrls: ['./add2cart.component.css']
})
export class Add2cartComponent implements OnInit {
  errorMessage: any;
  getresult: any;

  constructor(private newService:CommonService) { }

  ngOnInit(): void {
    this.newService.getPrices(this.newService.getlaundryId())
      .subscribe(data => {
      console.log(data.data);
      this.getresult = data.data;
    }
      , error => this.errorMessage = error)
  
    }
    add2cart(){
      
    }
  }
 


