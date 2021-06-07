import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  user: any;
  errorMessage: any;

  constructor(private newService: CommonService,private router: Router) { }

  ngOnInit(): void {
    this.user = this.newService.getUserId();
  }
  changePassword1(session:any){
    if(session.newpassword == session.conpass){
      if(session.presentpassword == this.user.password){
        this.user.password = session.newpassword;
        this.newService.UpdateUser(this.user)
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

}
