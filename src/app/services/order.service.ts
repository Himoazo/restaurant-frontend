import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url: string = "http://127.0.0.1:3000/api/orders";
  constructor(private http: HttpClient) { }

  //Place order
  addOrder(order: Order) :Observable<any>{
    return this.http.post(this.url, order);
  }
}
