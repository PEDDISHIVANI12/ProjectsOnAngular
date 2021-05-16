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

const appRoot: Routes = [
  {path: '', component: LoginComponent},
  {path: 'admin', component: AdminComponent,canActivate:[AuthenticationGuard]},
]
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    FormsModule,
    RouterModule,
    HttpModule,
    RouterModule.forRoot(appRoot)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
