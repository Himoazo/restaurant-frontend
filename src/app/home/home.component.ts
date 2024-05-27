import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../models/meal';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //background img
  burgerPic = "assets/hamburger.jpg";

  menu: Menu = { meals: [], sides: [], dipps: [] };

  //Selected item
  selectedItems: {
    menuItem: string;
    itemName: string;
    itemType: 'meal' | 'side' | 'dipp';
    quantity: number;
    price: number;
  }[] = [];


  constructor(private menuService: MenuService){}
  


  //Load menu on start
  ngOnInit(){
    this.menuService.getMeals().subscribe(data =>{
      this.menu = data;
    });
    this.getSavedItems();
  }

  

  //Load saved items from LS
  getSavedItems() :void{
    const storedItems =localStorage.getItem("items");
    if(storedItems){
      this.selectedItems = JSON.parse(storedItems);
      console.log(this.selectedItems);
    }
  }
  
  menuItem(item: any, itemName: string, itemType: 'meal' | 'side' | 'dipp', price: number): void {
    //kolla om varan finns redan
    const existingItem = this.selectedItems.find(
      (selectedItem) => selectedItem.menuItem === item._id && selectedItem.itemType === itemType 
      && selectedItem.price === price);

    if (existingItem) {
      // om varan redan finns +1 i quantity
      existingItem.quantity += 1;
      localStorage.setItem("items", JSON.stringify(this.selectedItems));
      this.getSavedItems();
    } else {
      // lägg till den
      const newItem = {
        menuItem: item._id,
        itemName,
        itemType,
        quantity: 1,
        price: price
      };

    this.selectedItems.push(newItem);
    localStorage.setItem("items", JSON.stringify(this.selectedItems));
    this.getSavedItems();
  }
  }
}


