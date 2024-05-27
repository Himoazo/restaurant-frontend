import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';


export const routes: Routes = [
    {path:"home", component: HomeComponent},
    {path:"order", component: OrderComponent},
    {path: "", redirectTo: "home", pathMatch: "full"},
    /* {path: "**", component: NotfoundComponent} */
];
