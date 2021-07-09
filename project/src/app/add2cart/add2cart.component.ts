import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { AppComponent } from "../app.component";
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';
import { EncryptionService } from '../encryption.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
@Component({
  selector: 'app-add2cart',
  templateUrl: './add2cart.component.html',
  styleUrls: ['./add2cart.component.css']
})
export class Add2cartComponent  extends AppComponent implements OnInit {
  errorMessage: any;
  getresult: any;
  totalData = new Array<Array<any>>();
  getlen = 0;
  select:any = "Washing";
  get: boolean = false;
  constructor(private ContactService:ContactService,private commonService:CommonService,private routing:Router,private auths1:AuthserviceService,private enService1: EncryptionService,private ref1: ChangeDetectorRef) { 
    super(ContactService,commonService,routing,auths1,enService1,ref1);
  }
  ngOnInit(): void {
    console.log(this.commonService.getlaundryId());
    this.commonService.getPrices(this.commonService.getlaundryId())
      .subscribe((data: { data: any; }) => {
      console.log(data.data);
      this.getresult = data.data;
    }
      , (error: any) => this.errorMessage = error)
      console.log(this.select);


    }
    add2cart(Type:any,Item:any,price:any){
      let myData = new Array<any>();
      myData.push(Type);
      myData.push(Item);
      myData.push(price);
      myData.push(1);
      console.log(myData);
      let count = 0;
      for(let index = 0; index < this.totalData.length;index ++ ){
        if((this.totalData[index][0] === myData[0]) && (this.totalData[index][1] === myData[1])){
          count = count + 1;
        }
      }
      if (count > 0){
        alert("You have already added the item into the cart");
      }
      else{
        this.totalData.push(myData);
      }
      console.log(this.totalData);
      this.getlen = this.totalData.length;
      console.log(this.getlen);
      this.commonService.sendCartItems(this.totalData);
      //this.commonService.sendnumberofCartItems(this.getlen);
      AppComponent.gettingcart(this.commonService,this.getlen1);
    }
    
    
  }
 


