import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(public contactService: HttpClient) { }

  sendEmailVolunteers(url: string, data: { name: any; email: any; message: any; }) {
    return this.contactService.post(url, data);
  }
}

