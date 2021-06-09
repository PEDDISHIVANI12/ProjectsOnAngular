import { Router } from '@angular/router';
import { CommonService } from './common.service';
import * as CryptoJS from 'crypto-js';
import { EncryptionService } from './encryption.service';
import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';
import { ContactService } from './contact.service';
import { Validators } from '@angular/forms';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  pricesdata = {'wasshirt':0,'wastie':0,'wasblazer':0,'waspant':0,'wasjeans':0,'wassuit':0,'ironshirt':0,'irontie':0,'ironblazer':0,'ironpant':0,'ironjeans':0,
  'ironsuit':0,'waishi':0,'waitie':0,'waiblazer':0,'waipant':0,'waijeans':0,'waisuits':0,'dryshirts':0,'drytie':0,'dryblazer':0,'drypant':0,'dryjeans':0,'drysuit':0,'status':'Save'};
  [x: string]: any;
  title = 'project'
  errorMessage: any;
  FirstName_laun:any;
  logincounting = 0;
  LastName_laun:any;
  comname:any;
  pnumber:any;
  Lcount= 0;
  Cuslogin = 0;
  Laucount =0;
  Ccount = 0;
  email_cus: any;
  email_forgot:any;
  email_laundry:any;
  secques_laun:any;
  secques:any;
  password:any;
  laundry:boolean = false;
  customer:boolean = false;
  home:boolean = true;
  conpassword:any;
  secans_cus:any;
  Repdata1: any;
  conversionDecryptOutput: any;
  conversionEncryptOutput: any;
  encryptSecretKey!: string;
  laundrycounting = 0;
  customercounting = 0;
  private subscription!: Subscription;
	@Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();

	@Input() SearchDate: moment.Moment = moment();
	@Input() ElapsTime: number = 3;

	searchEndDate: moment.Moment;
	remainingTime: any;
	minutes: any;
	seconds: any;

	everySecond: Observable<number> = timer(0, 1000);



  constructor(private contactService:ContactService,private newService: CommonService,private router:Router,private enService: EncryptionService,private ref: ChangeDetectorRef) {
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
   }
  Repdata: any;
  sendemail:any;
  valbutton = 'Save';
  password:any;
  OTP : any;
  conpassword : any;
  timerOn : boolean = true;
  test : boolean | undefined;
  show:boolean = true;
  unshow:boolean = false;
  
  ngOnInit() {
    

    this.subscription = this.everySecond.subscribe((seconds) => {
			var currentTime: moment.Moment = moment();
			this.remainingTime = this.searchEndDate.diff(currentTime)
			this.remainingTime = this.remainingTime / 1000;

			if (this.remainingTime <= 0) {
				this.SearchDate = moment();
				this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
				this.TimerExpired.emit();
        this.unshow = false;
        this.show = true;
			}
			else {
				this.minutes = Math.floor(this.remainingTime / 60);
				this.seconds = Math.floor(this.remainingTime - this.minutes * 60);
			}
			this.ref.markForCheck();
		})
    
	
    this.userRegistrationForm = this.fb.group({
      name: ["", Validators.required],
      email: ["",Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]
    });
  }
  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }
  


  useEmail(OTP:any,email:any){
    let user = {
      name: "Hello",
      email:email,
      message: OTP
    }
   
     this.contactService.sendEmailVolunteers("http://localhost:3000/sendmailv", user).subscribe(
       (data: any) => {
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏  details are sent successfully, the message id is ${res.messageId}`
        );
      },
       
    );
  }
  
  isValidEmail(session:any){
    console.log(session);
    this.OTP = this.generateOTP();
    this.sendemail = session.email_forgot;
    this.newService.isPresentLaundry(session.email_forgot)
      .subscribe((data:any) => {
        alert("We have sent you the mail please check it out");
        console.log(data);
        this.wholeObject = data;
        this.Lcount= this.Lcount + 1;
        this.show = false;
        this.unshow = true;
        this.useEmail(this.OTP,session.email_forgot);
        this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)
    this.newService.isPresentCustomer(session.email_forgot)
        .subscribe((data:any) => {
          alert("We have sent you the mail please check it out");
          console.log(data);
          this.wholeObject = data;
          this.show = false;
          this.Ccount = this.Ccount + 1 ;
          this.unshow = true;
          this.useEmail(this.OTP,session.email_forgot);
          this.ngOnInit();
        }
          , (error: any) => this.errorMessage = error)
  }


  check(otp:any){
    console.log(this.OTP);
    console.log(otp);
    if(this.OTP == otp){
      alert("good");
      this.unshow = false;
      this.conshow = true;

    }
    else{
      alert("no");
    }
  }

  selectFile(event:any){
    var files = event.target.files;
    var file = require("../assets/img/gallery/laundry.jpg") ;


  if (this.files && this.file) {
      var reader = new FileReader();

      reader.onload =this.handleFile.bind(this);

      reader.readAsBinaryString(file);
  }
}



handleFile(event:any) {
   var binaryString = event.target.result;
   this.base64textString= btoa(binaryString);
   console.log(btoa(binaryString));
  }



  onSave(user: any){
   // user.secques = CryptoJS.AES.encrypt(this.plainText, user.secques).toString();
    //user.secans = CryptoJS.AES.encrypt(this.plainText, user.secans).toString();
    user.mode = this.valbutton;
    user.LaundryPic = this.base64textString;
    user.status = "InProcess";
    console.log(user);
    this.newService.saveUser(user)
      .subscribe((data:any) => {
        alert(data.data);
        this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)
        this.newService.savePrices(this.pricesdata)
        .subscribe((data:any) => {
          alert(data.data);
          this.ngOnInit();
        }
          , (error: any) => this.errorMessage = error)

  }
  
  onSave_customer(user1: any){
   // user1.secques = CryptoJS.AES.encrypt(this.plainText, user1.secques).toString();
    //user1.secans = CryptoJS.AES.encrypt(this.plainText, user1.secans).toString();
    //user1.password = CryptoJS.AES.encrypt(this.plainText, user1.password).toString();
   
    //this.decrypted= this.get('123456$#@$^@1ERF',user1.password);
    //console.log(this.decrypted);
    user1.mode = this.valbutton;
   // console.log(user1);
    if (this.password == this.conpassword){
     // user1.delete(user1.conpassword)
      this.newService.saveUser_customer(user1)
      .subscribe((data:any) => {
        alert(data.data);
        this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)
      
  }

  else {
    alert('Invalid');
  }

}


forgot(session:any){
  if (session.chpassword == session.conchpassword){
    if (this.Lcount > 0){
      this.wholeObject.data.password = session.chpassword;
      this.newService.UpdateUser(this.wholeObject.data)
      .subscribe(data => {
      alert(data.data);
      //this.router.navigate(["tutorProfile"]);
      this.ngOnInit();
    }
      , error => this.errorMessage = error)
  }
    else {
      this.wholeObject.data.password_cus = session.chpassword;
    this.newService.UpdateUser_Customer(this.wholeObject.data)
    .subscribe(data => {
    alert(data.data);
    //this.router.navigate(["tutorProfile"]);
    this.ngOnInit();
  }
    , error => this.errorMessage = error)
}}
  else{
    alert("Invalid")
  }
}

generateOTP() {
  var digits = '0123456789';
  for (let i = 0; i < 5; i++ ) {
      this.OTP += digits[Math.floor(Math.random() * 10)];
  }
  return this.OTP;
}



login(user_login:any){
  this.newService.login(user_login)
    .subscribe(data => {
   console.log(data.data[0]);
   if (typeof(data.data[0]) !== "undefined"){
     //this.laundrycounting = this.laundrycounting + 1;
     this.newService.setUserId(data.data[0]);
    // this.newService.sendDetails(data.data);
     this.laundry = true;
     this.home= false;
     console.log(this.laundry);
     console.log(this.home);
     this.router.navigate(["Customer"]);
   }
  }
    , error => this.errorMessage = error)

  this.newService.loginCustomer(user_login)
    .subscribe(data => {
    console.log(data.data[0]);
    if (typeof(data.data[0]) !== "undefined"){
      //this.customercounting = this.customercounting + 1;
     this.newService.setUserId(data.data[0]);
     data.data[0].date = new Date();
     this.newService.UpdateUser_Customer(data.data[0])
      .subscribe((data:any) => {
        alert(data.data);
        this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)

     //this.newService.sendDetails(data.data);
     this.router.navigate(["Laundry"]);
    }
  }
    , error => this.errorMessage = error)
    
   /**  if (this.laundrycounting > 1){
      this.router.navigate(["Customer"]);
    }
    else if(this.customercounting > 1){
      this.router.navigate(["Laundry"])
    }
    else{
      alert("Invalid")
    }**/

}
Profile(){
  this.router.navigate(['Update']);
}
change(){
  this.router.navigate(['change']);
}
Orders(){
  this.router.navigate(['Customer']);
}
Prices(){
  this.router.navigate(['Customers']);
}
logout(){
  this.home = true;
  this.laundry = false;
  this.customer = false;
  this.router.navigate(['']);
}
  
  
 
  
}


