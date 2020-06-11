import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Router,ActivatedRoute} from '@angular/router';
import { LocalStorageService, AngularWebStorageModule } from 'angular-web-storage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  alldata: any;
  sts:number = 1;
  cartTotal:number;

  constructor(private router: Router, public local: LocalStorageService, private cartService: CartService,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
  }

  getUsername(){
    let user = this.local.get('customer').result.username;
    return user;
  }


  

  getProductData(){
    if(this.sts == 1){
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
    this.sts = 0;
    return this.alldata;
  } 

  getTotal(){
    this.cartTotal=0;
    for(let item of this.getProductData()){
      this.cartTotal += (item.price*item.quantity); 
    }
    return this.cartTotal;
  }
}
