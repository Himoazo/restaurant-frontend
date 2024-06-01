import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url: string = "https://backend-project-production-f507.up.railway.app/api/orders";
  constructor(private http: HttpClient) { }

  //Place order
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url, order);
  }

}
