import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  private url: string = "http://127.0.0.1:3000/api/contact/";

  constructor(private http: HttpClient) { }

  //Send contact us message
  sendMessage(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.url, contact);
  }
}
