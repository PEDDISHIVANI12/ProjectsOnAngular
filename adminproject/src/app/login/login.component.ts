import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: any;
  constructor(private newService: CommonService,private router:Router,private auths:AuthService) { }
  yes:any;
  
  ngOnInit(): void {
    this.newService.getadmin().subscribe((data1 : any) => {
      this.yes = data1;
      
    });
    console.log(this.yes);

  }
  login(session:any){
    if((session.username == this.yes[0].username) && (session.password == this.yes[0].password)){
      this.yes[0].count = this.yes[0].count + 1;
      this.newService.updateadmin(this.yes[0])
      .subscribe((data: { data: any; }) => {
      alert(data.data);
      //
      this.auths.settoken();
      this.router.navigate(["admin"]);
      this.ngOnInit();
      }   , (error: any) => this.errorMessage = error)
      if(this.yes[0].count >= 3){
        alert("Please Change the Password");
      }
    }
    else{
      alert("Invalid");
    }
  }
}
