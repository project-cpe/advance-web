import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { OrderStatusService } from 'src/app/service/order-status.service';
import { OrderHistoryService } from 'src/app/service/order-history.service';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  sts:number = 1;
  term: string;
  image: File;
  token: string;
  alldata: any
  previewLoaded: boolean = false;
  status: any;
  bt:number = 0;
  dataOrder: any;

  constructor(
    private router: Router, 
    private orderStatusService: OrderStatusService,  
    private orderHistoryService: OrderHistoryService, 
    public local: LocalStorageService
    ) { }

  ngOnInit(): void {
    console.log(this.getAllData());
    status = this.orderStatusService.getAllStatusType();
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


  getAllData(){
    if(this.sts == 1){
    this.orderStatusService.findOrderUser(this.getUsername())
    .subscribe(
      response => {
        //console.log(response);
        this.alldata = response;
        //console.log(this.alldata);
      },
      error => {
        console.log(error);
      });
    }
    this.sts = 0;
    return this.alldata;
  }

  updateCancelProduct(productId: any){
    //console.log(productId);
    const data = {
      status: "ยกเลิกการสั่งซื้อ"
    };
    this.orderStatusService.update(productId, data)
      .subscribe(
        response =>{
          // alert('คุณได้ยกเลิกการสั่งซื้อแล้ว')
          Swal.fire(
            'ยกเลิกการสั่งซื้อสำเร็จ!',
            'Your file has been update.',
            'success'
          )
          this.dataOrder = response;
          this.saveDataOrder(this.dataOrder)
          //console.log(response);
          this.sts = 1;
          this.getAllData();
        },
        error => {
          console.log(error);
        }
      );
  }

  updateGetProduct(productId: any){
    console.log(productId);
    const data = {
      status: "เสร็จสิ้น"
    };
    this.orderStatusService.update(productId, data)
      .subscribe(
        response =>{
          Swal.fire(
            'Thank you!',
            'Your file has been update.',
            'success'
          )
          //console.log(response);
          this.dataOrder = response;
          this.saveDataOrder(this.dataOrder)
          this.router.navigate(['/orderhistory'])
        },
        error => {
          console.log(error);
        }
      );
  }

  saveDataOrder(dataOr: any){ 
    //console.log(dataOr)
    this.orderHistoryService.create(dataOr)
      .subscribe(
        data => {
          //console.log(data);
      },
      error => {
        console.log(error);
      });
      //console.log(dataOr._id);
    this.orderStatusService.deleteOrder(dataOr._id)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  checkButtonAndStatus(status){
    if(this.bt == 0){
      if(status == 'รอการยืนยัน' ||  status == 'กำลังจัดส่ง' || status == 'ที่ต้องได้รับ'){
        return true;
      }
      else {
        return false;
      }
    }else if(this.bt == 1){
      if(status == 'รอการยืนยัน'){
        return true;
      }else{
        return false;
      }
    }else if(this.bt == 2){
      if(status == 'กำลังจัดส่ง'){
        return true;
      }else{
        return false;
      }
    }else if(this.bt == 3){
      if(status == 'ที่ต้องได้รับ'){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
    
  }
}
