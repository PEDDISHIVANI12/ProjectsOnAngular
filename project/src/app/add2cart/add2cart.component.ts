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
  totalData = new Array<Array<any>>();
  getlen = 0;
  get: boolean = false;
  constructor(private newService:CommonService) { }

  ngOnInit(): void {
    this.newService.getPrices(this.newService.getlaundryId())
      .subscribe(data => {
      console.log(data.data);
      this.getresult = data.data;
    }
      , error => this.errorMessage = error)
  
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
      }
      console.log(this.totalData);
      this.getlen = this.totalData.length;
      console.log(this.getlen);
      
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
    add2cart(){

    }
    washing(){

    }
    WashIron(){

    }
    Ironing(){

    }
    dry(){
      
    }
    movetopayment(){
      
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
  }
 


