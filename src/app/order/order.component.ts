import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatStepperModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

  constructor(private orderService: OrderService, private _formBuilder: FormBuilder) {}
  isLinear = true; //Stepper

  
  
  //Order items
  selectedItems: {
    menuItem: string;
    itemName: string;
    itemType: 'meal' | 'side' | 'dipp';
    quantity: number;
    price: number;
  }[] = [];


  ngOnInit(){
    this.getSavedItems();
  }


  //Load saved items from LS
 getSavedItems() :void{
  const storedItems =localStorage.getItem("items");
  if(storedItems){
    this.selectedItems = JSON.parse(storedItems);
    /* console.log(this.selectedItems); */
  }
}

//Summan
totalCost() :number{
  return this.selectedItems.reduce((sum, item)=>{
   return sum + (item.price * item.quantity);
  },0);
}

//Plus button
increment(item: any): void {
  item.quantity += 1;
  localStorage.setItem("items", JSON.stringify(this.selectedItems));
  this.getSavedItems();
}

//Minus button
decrement(item: any): void {
  if (item.quantity > 1) {
      item.quantity -= 1;
      localStorage.setItem("items", JSON.stringify(this.selectedItems));
      this.getSavedItems();
  } else {
      // ta bort
      this.selectedItems = this.selectedItems.filter((selectedItem) => selectedItem !== item);
      localStorage.setItem("items", JSON.stringify(this.selectedItems));
      this.getSavedItems();
  }
}
//Customer info
customerName = this._formBuilder.group({
  name: ['', Validators.required],
});
customerEmail = this._formBuilder.group({
  email: ['', Validators.email],
});


//order object
order! :Order;
checkOut():void{

    if(typeof this.customerName.value.name ==="string" && this.customerName.value.name != null && 
    typeof this.customerEmail.value.email === "string" && this.customerEmail.value.email != null){
      
      this.order = {
        customer: {
          name: this.customerName.value.name,
          email: this.customerEmail.value.email
          },
          items: this.selectedItems,
          total: this.totalCost(),
          status: 'pending'
          } 
    }else{
      console.log("incorrect customer info");
    }
  this.placeOrder();
}

kvitto: boolean = false;
placeOrder():void{
  console.log(this.order + "från component");
  this.orderService.addOrder(this.order as Order).subscribe({
    next: ()=>{
      this.kvitto = true;
      localStorage.removeItem("items");
    },
    error: (error)=>{
      console.log(error);
    }
  });
}

}
