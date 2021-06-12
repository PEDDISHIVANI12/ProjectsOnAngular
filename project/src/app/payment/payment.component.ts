import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CommonService } from '../common.service';
import { ContactService } from '../contact.service';
import { EncryptionService } from '../encryption.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent extends AppComponent implements OnInit {
  show:boolean = false;
  details: any;
  select:any = 'pay';
  errorMessage: any;
  paymentmode : any;
  orders: any;
  currentDate = new Date();
  pickup:any;
  sum = 0;
  constructor(private ContactService:ContactService,private commonService:CommonService,private routing:Router,private enService1: EncryptionService,private ref1: ChangeDetectorRef) { 
    super(ContactService,commonService,routing,enService1,ref1);
  }

  ngOnInit(): void {
    this.orders = this.commonService.getCartItems();
    for (let i = 0; i < this.orders.length; i++) {
      this.orders[i][2] = Number(this.orders[i][2]);
      this.orders[i][3] = Number(this.orders[i][3]);
      this.sum = this.sum + (this.orders[i][2] * this.orders[i][3]);
    }
  }
  
  payment(data:any){
    data.cus_id = this.commonService.getUserId()._id;
    data.order = this.orders;
    data.laundname = this.commonService.getlaundryname();
    data.laundid = this.commonService.getlaundryId();
    data.paymentmode = this.paymentmode;
    data.sum = this.sum;
    data.status = "Ordered";
    data.length = this.orders.length;
    this.commonService.Payment(data)
      .subscribe((data:any) => {
        alert(data.data);
       // this.ngOnInit();
      this.commonService.sendLaundryOrders(data);
      }
        , (error: any) => this.errorMessage = error)
        let user = {
          name: this.commonService.getUserId()._id,
          email:this.commonService.getUserId().email_cus,
          message: data
        }
       
         this.ContactService.sendEmailVolunteers("http://localhost:3007/sendmailv", user).subscribe(
           (data: any) => {
            let res:any = data; 
            console.log(
              `👏 > 👏 > 👏 > 👏  details are sent successfully, the message id is ${res.messageId}`
            );
          },
           
        );
    AppComponent.closinglen();
    this.routing.navigate(['yourorders']);
    
  }


}
