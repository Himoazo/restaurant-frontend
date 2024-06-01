import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Menu, Hamburger, Side, Dipp} from '../models/meal';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url: string = "https://backend-project-production-f507.up.railway.app/api/";
  constructor(private http: HttpClient) { }

  getMeals(): Observable<Menu> {
    return this.http.get<Menu>(this.url);
  }
}
