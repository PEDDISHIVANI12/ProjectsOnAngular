import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  errorMessage: any;

  constructor(private newService: CommonService,private router: Router) { }
  user:any;
  ngOnInit(): void {
    this.user = this.newService.getUserId();

  }
  update(data:any){
    data._id = this.user._id;
    data.status = this.user.status;
    data.password = this.user.password;
    console.log(data);
    this.newService.UpdateUser(data)
      .subscribe((data:any) => {
        console.log(data);
        alert(data.data);
        this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)
  }

}
