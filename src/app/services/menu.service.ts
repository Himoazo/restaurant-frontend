import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Menu, Hamburger, Side, Dipp} from '../models/meal';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url: string = "http://127.0.0.1:3000/api/";
  constructor(private http: HttpClient) { }

  getMeals(): Observable<Menu> {
    return this.http.get<Menu>(this.url);
  }
}
