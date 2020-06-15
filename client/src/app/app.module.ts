import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegistryComponent } from './component/registry/registry.component';
import { AddListComponent } from './component/add-list/add-list.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { EmployeeLoginComponent } from './component/employee-login/employee-login.component';
import { ShowListComponent } from './component/show-list/show-list.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { OrderStatusComponent } from './component/order-status/order-status.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { OrderConfirmComponent } from './component/order-confirm/order-confirm.component';
import { EmNavbarComponent } from './component/em-navbar/em-navbar.component';
import { CusNavbarComponent } from './component/cus-navbar/cus-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistryComponent,
    AddListComponent,
    ProductListComponent,
    EmployeeLoginComponent,
    ShowListComponent,
    ProductDetailComponent,
    OrderHistoryComponent,
    OrderStatusComponent,
    CartComponent,
    OrderListComponent,
    OrderConfirmComponent,
    EmNavbarComponent,
    CusNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
