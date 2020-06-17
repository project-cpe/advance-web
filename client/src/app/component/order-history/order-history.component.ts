import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
//import { AddListService } from 'src/app/service/add-list.service';
import { LocalStorageService } from 'angular-web-storage';
import { OrderStatusService } from 'src/app/service/order-status.service';
import { OrderHistoryService } from 'src/app/service/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  sts:number = 1;
  term: string;
  image: File;
  token: string;
  alldata: any
  previewLoaded: boolean = false;

  constructor(
    private router: Router, 
    private local: LocalStorageService,
    private orderStatusService: OrderStatusService,
    private orderHistoryService: OrderHistoryService
    ) { }

  ngOnInit(): void {
  }

  Logout(){
    this.router.navigate(['/home']);
  }

  getUsername(){
    //let user = localStorage.getItem("Emusername");
    let user = this.local.get('customer').result.username;
    return user;
  }

  getAllData(){
    if(this.sts == 1){
    this.orderHistoryService.findOrderUser(this.getUsername())
    .subscribe(
      response => {
        //console.log(response);
        this.alldata = response;
        console.log(this.alldata);
      },
      error => {
        console.log(error);
      });
    }
    this.sts = 0;
    return this.alldata;
  }

  checkStatus(status: any){
    if(status == 'ยกเลิกการสั่งซื้อ' ||  status == 'เสร็จสิ้น' ){
      return true;
    }
    else {
      return false;
    }
  }

  

}
