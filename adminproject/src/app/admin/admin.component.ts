import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { ContactService } from '../contact.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  showModal : boolean | undefined;
  showModal1 : boolean | undefined;
  FirstName: any;
  CompanyName: any;
  Email: any;
  Add1: any;
  Add2: any;
  LastName: any;
  District: any;
  Pincode: any;
  State: any;
  PhoneNumber: any;
  public Repdata1 :any ;
  Repdata:any;
  status : any;
  errorMessage: any;
  session : any;
  UserId    : any;
  Firstname : any;
  Lastname  : any;
  document: any;
 // data1 :any;
 // admin: adminof[] = null;
  showModalpa: boolean = false;
  localData!: Object;
 // yes:any;
  hello:any
  yes : any;

  constructor(private newService: CommonService,private router: Router,private contactService: ContactService) { }
  
  
  ngOnInit(): void {
    this.newService.getadmin().subscribe((data1 : any) => {
      this.yes = data1;
      console.log(this.yes)
    });
    //console.log(this.yes);

    console.log("hello");
    this.newService.GetUser().subscribe(data => {console.log(data),this.Repdata = data})
    console.log(this.Repdata)

  }
  
  
  
  show(_event: any)
  {
    this.showModal = true; // Show-Hide Modal Check
    this.FirstName = _event.FirstName_laun;
    this.CompanyName = _event.comname;
    this.Email = _event.email_laundry;
    this.Add1 = _event.add1;
    this.Add2 = _event.add2;
    this.LastName = _event.LastName_laun;
    this.District = _event.district;
    this.Pincode = _event.pincode;
    this.State = _event.state;
    this.PhoneNumber = _event.pnumber;
  }
  changepassword(){
    this.showModalpa = true;
  }
  changeadminPassword(session:any){
    if(session.newpassword == session.conpass){
      if(session.presentpassword == this.yes[0].password){
        this.yes[0].count = 0
        this.yes[0].password = session.newpassword;

        this.newService.updateadmin(this.yes[0])
        .subscribe((data: { data: any; }) => {
        alert(data.data);
        //this.router.navigate(["admin"]);
        this.ngOnInit();
        }   , (error: any) => this.errorMessage = error)
      }
      else{
        alert("Passwords donot match");
      }
    }
    else{
      alert("passwords are invalid");
    }
   
  }


  hide()
  {
    this.showModalpa = false;
    this.showModal = false;
  }


  accept(session:any){
    var randomstring = Math.random().toString(36).slice(-8);
    session.status = "Accepted";
    session.password = randomstring;
    console.log(session);
    this.newService.UpdateUser(session)
    .subscribe((data: { data: any; }) => {
     alert(data.data);
      //this.router.navigate(["tutorProfile"]);
      this.ngOnInit();
    }
      , (error: any) => this.errorMessage = error)
     // var count = 0;
      console.log(randomstring);
      let user = {
        name: session.FirstName_laun,
        email: session.email_laundry,
        message: randomstring
      }
     
       this.contactService.sendEmailVolunteers("http://localhost:3002/sendmailv", user).subscribe(
         (data: any) => {
          let res:any = data; 
          console.log(
            `👏 > 👏 > 👏 > 👏 ${user.name}s details are sent successfully, the message id is ${res.messageId}`
          );
        },
         
      );
  }


  delete(session:any){
    console.log(session);
      var count = 0;
      let user = {
        name: session.FirstName_laun,
        email: session.email_laundry,
        message: "Not Accepted"
      }
     
       this.contactService.sendEmailVolunteers("http://localhost:3001/sendmailv", user).subscribe(
         (data: any) => {
          let res:any = data; 
          console.log(
            `👏 > 👏 > 👏 > 👏 ${user.name}s details are sent successfully, the message id is ${res.messageId}`
          );
        },
         
      );
      this.newService.deleteUser(session._id)
      .subscribe((data: { data: any; }) => {
        alert(data.data);
        //this.router.navigate(['login']);
        this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)
  }
}