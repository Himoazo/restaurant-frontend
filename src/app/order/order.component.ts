import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatStepperModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
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
    console.log(this.selectedItems);
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

constructor(private _formBuilder: FormBuilder) {}
//Angular material stepper
firstFormGroup = this._formBuilder.group({
  firstCtrl: ['', Validators.required],
});
secondFormGroup = this._formBuilder.group({
  secondCtrl: ['', Validators.required],
});
isLinear = true;
}
