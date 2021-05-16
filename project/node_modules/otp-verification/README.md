# Angular Otp Verification

OTP verification input login implementation.

## Description

Highly configurable Angular otp verification. Compatible Angular 7+.

[Online demo](https://akhilmohanan.github.io/angular-otpVerification/) is here.


## Installation and usage

To install this component to an external project, follow the procedure:

 1. **npm install otp-verification --save**
 2. Add **OtpVerificationModule** import to your **@NgModule** like example below
    ```javascript
      import { BrowserModule } from '@angular/platform-browser';
      import { NgModule } from '@angular/core';
      import { AppComponent } from './app.component';
      import { OtpVerificationModule } from 'otp-verification';

      @NgModule({
        declarations: [
          AppComponent
        ],
        imports: [
          BrowserModule,
          OtpVerificationModule
        ],
        providers: [],
        bootstrap: [AppComponent]
      })
      export class AppModule { }

    ```
  3. Add **angular-otp-verification** selector to template
      ```html
      <angular-otp-verification [isAlphanumeric]="true" (otpOut)="setOtp($event)"></angular-otp-verification>
      ```

## Attributes
### options attribute

Option | Default | Type | Description
------ | ------- | ---- | -----------
isAlphanumeric | true | boolean | set to false if you need only numeric input

## Callbacks
### otpOut
  * Called when the all the 4 digits are added,
  * Output format is in string
  ```javascript
  setOtp(otp: string) {
    console.log('the opt is ', otp);
  }
  ```
