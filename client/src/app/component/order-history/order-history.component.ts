import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
//import { AddListService } from 'src/app/service/add-list.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  term: string;

  constructor(private router: Router, private local: LocalStorageService) { }

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

  

}
