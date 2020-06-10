import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
//import { AddListService } from 'src/app/service/add-list.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  term: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Logout(){
    this.router.navigate(['/home']);
  }

  

  

}
