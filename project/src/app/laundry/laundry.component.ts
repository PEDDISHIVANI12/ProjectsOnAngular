import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.css']
})
export class LaundryComponent implements OnInit {
  [x: string]: any;
  searchText !: string;
 // countries: Country[];
  numberofitems : any;
  // countries: Country[];
  //mySet = new Set();
  term!: string;
  totalData = new Array<Array<any>>();
  carts:any;
  put = false;
  get = false;
  getlen = 0;
  getresult:any;
  display:boolean = true;
  errorMessage: any;
  votes: number = 1;
  constructor(private newService: CommonService,private router: Router) { }

  ngOnInit(): void {
    this.newService.GetUser().subscribe((data : any) => {
      this.carts = data;
    });   
  }
  addtocart(Type:any,Item:any,price:any){
    let myData = new Array<any>();
    myData.push(Type);
    myData.push(Item);
    myData.push(price);
    myData.push(1);
    console.log(myData);
    console.log(this.totalData.indexOf(myData));
    if(this.totalData.indexOf(myData) === -1) {
      this.totalData.push(myData);
      console.log(this.totalData);
    }
    console.log(this.totalData);
    this.getlen = this.totalData.length;
    console.log(this.getlen);
    if (this.getlen == 0){
      this.get = true;
    }
    else{
      this.get = false;
    }
    
  }
  getCustomerDetails(){
    this.newService.getDetails(this.newService.getUserId()._id)
    .subscribe(data => {
    console.log(data);
    this.getresult1 = data;
  }
    , error => this.errorMessage = error)

  }
  getprices(cart:any){
    this.newService.sendlaundryId(cart._id);
    this.newService.getPrices(cart)
    .subscribe(data => {
    console.log(data.data);
    this.getresult = data.data;
  }
    , error => this.errorMessage = error)

  }
  removing(data:any){
    const index: number = this.totalData.indexOf(data);
    this.totalData.splice(index, 1);
    this.getlen = this.totalData.length;
    if (this.getlen == 0){
      this.get = true;
    }
    else{
      this.get = false;
    }
  }
  onIncrement(data:any): void {
    const index: number = this.totalData.indexOf(data);
    data[3] = Number(this.totalData[index][3]) + 1;
    console.log(this.totalData);
    }
   
    onDecrement(data:any): void {
      const index: number = this.totalData.indexOf(data);
      if (data[3] > 0) {
        data[3] = Number(this.totalData[index][3]) - 1;
        console.log(this.totalData);
      }
      else{
        data[3] = 0;
      }
    }
    show(){
      this.put = true;
      this.display = false;
    }

    checkout(){
      this.getlen = this.totalData.length;
      if (this.getlen == 0){
        this.get = true;
    }
      else{
        this.get = false;
    }
    }
  
  movetopayment(){
   // this.newService.setpaid(paid);
    this.newService.sendorder(this.totalData);
    this.router.navigate(["Payment"]);
  }

}

