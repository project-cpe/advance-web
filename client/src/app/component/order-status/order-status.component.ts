import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { OrderStatusService } from 'src/app/service/order-status.service';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  term: string;

  constructor(private router: Router, private orderStatusService: OrderStatusService, public local: LocalStorageService) { }

  ngOnInit(): void {
  }

  Logout(){
    this.router.navigate(['/home']);
  }
  
  getAllStatus(){
    return this.orderStatusService.getAllStatusType();
  }

  getUsername(){
    //let user = localStorage.getItem("Emusername");
    let user = this.local.get('customer').result.username;
    return user;
  }

}
