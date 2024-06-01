import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';


export const routes: Routes = [
    {path:"home", component: HomeComponent, title: "Fetch-Burger"},
    {path:"order", component: OrderComponent, title: "Fetch-Burger"},
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "**", component: HomeComponent}
];
