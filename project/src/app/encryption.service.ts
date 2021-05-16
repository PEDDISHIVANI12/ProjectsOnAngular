import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  encrypt(value: string,data:any): string {
    return CryptoJS.AES.encrypt(value, data).toString();
  }

  decrypt(textToDecrypt: string,data:any) {
    return CryptoJS.AES.decrypt(textToDecrypt,data).toString(CryptoJS.enc.Utf8);
  }

}