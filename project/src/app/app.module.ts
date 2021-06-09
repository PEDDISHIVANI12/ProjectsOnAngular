import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule} from '@angular/forms'; 
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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PaymentComponent } from './payment/payment.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { YourordersComponent } from './yourorders/yourorders.component';
import { UpdateComponent } from './update/update.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { Add2cartComponent } from './add2cart/add2cart.component';
import { SafehtmlPipe } from './safehtml.pipe';


const appRoot: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Laundry', component: LaundryComponent},
  {path: 'Customer', component: CustomerComponent},
  {path: 'Payment', component: PaymentComponent},
  {path: 'Update', component: UpdateComponent},
  {path: 'change', component: ChangepasswordComponent},
  {path: 'add2cart', component: Add2cartComponent},


]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LaundryComponent,
    CustomerComponent,
    PaymentComponent,
    CustomerListComponent,
    YourordersComponent,
    UpdateComponent,
    ChangepasswordComponent,
    Add2cartComponent,
    SafehtmlPipe,
  ],
  imports: [
    BrowserModule,
    NgOtpModule,
    Ng2SearchPipeModule,
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
