import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgOtpModule } from 'ng-otp';
import { OtpVerificationModule } from 'otp-verification';
import { LaundryComponent } from './laundry/laundry.component';
import { CustomerComponent } from './customer/customer.component';


const appRoot: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Laundry', component: LaundryComponent},
  {path: 'Customer', component: CustomerComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LaundryComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    NgOtpModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgOtpModule,
    OtpVerificationModule,
    RouterModule.forRoot(appRoot),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
