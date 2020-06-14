import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { OrderStatusService } from 'src/app/service/order-status.service'
import { Router,ActivatedRoute} from '@angular/router';
import { LocalStorageService, AngularWebStorageModule } from 'angular-web-storage';

@Component({
  selector: 'app-cus-navbar',
  templateUrl: './cus-navbar.component.html',
  styleUrls: ['./cus-navbar.component.css']
})
export class CusNavbarComponent implements OnInit {

  alldata: any;
  find:number = 1;

  constructor(private router: Router, public local: LocalStorageService, private cartService: CartService,
    private route: ActivatedRoute, private orderStatus: OrderStatusService) { }

  ngOnInit(): void {
  }
  getUsername(){
    let user = this.local.get('customer').result.username;
    return user;
  }
  Logout(){
    this.local.remove('customer');
    this.router.navigate(['/home']);
  }

  getCount(){
    if(this.find == 1){
    this.cartService.findCartUser(this.getUsername())
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
    this.find = 0;
    return this.alldata.length;
  } 

}
