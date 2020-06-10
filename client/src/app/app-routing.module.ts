import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistryComponent } from './component/registry/registry.component';
import { AddListComponent } from './component/add-list/add-list.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { EmployeeLoginComponent } from './component/employee-login/employee-login.component';
import { ShowListComponent } from './component/show-list/show-list.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'registry', component: RegistryComponent},
  { path: 'addlist', component: AddListComponent},
  { path: 'home', component: LoginComponent },
  { path: 'productlist', component: ProductListComponent},
  { path: 'loginem', component: EmployeeLoginComponent},
  { path: 'showlist', component: ShowListComponent},
  { path: 'productdetail/:id', component: ProductDetailComponent},
  { path: 'orderhistory', component: OrderHistoryComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
