import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatListModule} from '@angular/material/list';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './login/login.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { BudgetComponent } from './budget/budget.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const appRoot: Routes = [
  {path: '', component: LoginComponent},
  {path: 'admin', component: AdminComponent,canActivate:[AuthenticationGuard]},
  {path: 'customer', component: CustomerListComponent,canActivate:[AuthenticationGuard]},
  {path: 'budget', component: BudgetComponent,canActivate:[AuthenticationGuard]},

]
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    CustomerListComponent,
    BudgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    FormsModule,
    RouterModule,
    Ng2SearchPipeModule,
    HttpModule,
    RouterModule.forRoot(appRoot)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
