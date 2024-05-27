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
  //Load menu on start
  ngOnInit(){
    this.menuService.getMeals().subscribe(data =>{
      this.menu = data;
    });
  }

  selectedItems: {
    menuItem: string;
    itemType: 'meal' | 'side' | 'dipp';
    quantity: number;
    price: number;
  }[] = [];

  
  menuItem(item: any, itemType: 'meal' | 'side' | 'dipp', price: number): void {
    //kolla om varan finns redan
    const existingItem = this.selectedItems.find(
      (selectedItem) => selectedItem.menuItem === item._id && selectedItem.itemType === itemType
    );
    if (existingItem) {
      // om varan redan finns +1 i quantity
      existingItem.quantity += 1;
    } else {
      // lägg till den
      const newItem = {
        menuItem: item._id,
        itemType,
        quantity: 1,
        price: price
      };

    this.selectedItems.push(newItem);
    console.log('Selected items:', this.selectedItems);
  }
  }
}


