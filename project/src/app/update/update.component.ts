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
  base64textString!: string;
LaundryPic:any;
  constructor(private newService: CommonService,private router: Router) { }
  user:any;
  ngOnInit(): void {
    this.user = this.newService.getUserId();

  }
  selectFile(event:any){
    var files = event.target.files;
    var file = files[0];

  if (files && file) {
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
  update(data:any){
    data._id = this.user._id;
    data.status = this.user.status;
    data.password = this.user.password;
    data.LaundryPic = this.base64textString;
    console.log(data);
    this.newService.UpdateUser(data)
      .subscribe((data:any) => {
        console.log(data);
        alert(data.data);
       // this.ngOnInit();
      }
        , (error: any) => this.errorMessage = error)
  }

}
