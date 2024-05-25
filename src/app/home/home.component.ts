import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/meal';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  burgerPic = "assets/hamburger.jpg";
  menu: Menu = { meals: [], sides: [], dipps: [] };

  constructor(private menuService: MenuService){}

  ngOnInit(){
    this.menuService.getMeals().subscribe(data =>{
      this.menu = data;
      console.log(this.menu);
    });
  }
}
