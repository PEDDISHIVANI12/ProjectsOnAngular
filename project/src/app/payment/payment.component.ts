import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthserviceService } from '../authservice.service';
import { CommonService } from '../common.service';
import { ContactService } from '../contact.service';
import { EncryptionService } from '../encryption.service';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
    type: 'success',
    message: 'This is an success alert',
  }, 
];
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent extends AppComponent implements OnInit {
  alerts!: Alert[];
  showModal:boolean=false;
  showModal1:boolean=false;
  showModal2:boolean=false;
  showModal3:boolean=false;
  showModal4:boolean=false;
  show:boolean = false;
  details: any;
  select:any = 'pay';
  errorMessage: any;
  paymentmode : any;
  orders: any;
  presentyear:any = new Date().getFullYear();
  
  //currentDate:any= new Date(); 
  sum = 0;
  constructor(private ContactService:ContactService,private commonService:CommonService,private routing:Router,private auths1:AuthserviceService,private enService1: EncryptionService,private ref1: ChangeDetectorRef) { 
    super(ContactService,commonService,routing,auths1,enService1,ref1);
    this.reset();

  }
  currentDate :Date = new Date();
  pickup:any;
  delidate:any;


  checkcvv(event:any){
    if (event.length > 3 || event.length < 3){
      this.showModal1 = true;
    }
    else{
      this.showModal1 = false;
    }
  }
  checkyear(event:any){
    if (new Date().getFullYear() <= event){
      this.showModal2 = true;
    }
    else{
      this.showModal2 = false;
    }
  }
  checkccnum(event:any){
    if (event.length > 12){
      this.showModal3 = true;
    }
    else{
      this.showModal3 = false;
    }
  }
  checkmonth(event:any){
    if (new Date().getMonth()+ 1 <= event){
      this.showModal4 = true;
    }
    else{
      this.showModal4 = false;
    }
  }
  update(event:any){
    console.log(event);
    this.delidate = new Date(new Date(event).getTime()+2*24*60*60*1000);
  }
  onClick(event:any)
  {
    this.showModal = true; // Show-Hide Modal Check
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
    this.showModal1 = false;
    this.showModal2 = false;
    this.showModal3 = false;
    this.showModal4 = false;
  }
  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
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
    data.orderdate = new Date();
    data.status = "Ordered";
    data.length = this.orders.length;
    this.commonService.Payment(data)
      .subscribe((data:any) => {
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
  openForm(){
    this.show = true;
  }
  closeForm(){
    this.show = false;
  }

}
