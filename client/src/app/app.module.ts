import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegistryComponent } from './component/registry/registry.component';
import { AddListComponent } from './component/add-list/add-list.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { EmployeeLoginComponent } from './component/employee-login/employee-login.component';
import { ShowListComponent } from './component/show-list/show-list.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component'

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
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
