import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-em-navbar',
  templateUrl: './em-navbar.component.html',
  styleUrls: ['./em-navbar.component.css'],
})
export class EmNavbarComponent implements OnInit {
  constructor(private router: Router, public local: LocalStorageService) {}

  ngOnInit(): void {}

  getUsername() {
    //let user = localStorage.getItem('Emusername');
    let user = this.local.get('employee').result.username;
    return user;
  }

  Logout() {
    // localStorage.removeItem('Emusername');
    // localStorage.removeItem('Empassword');
    this.local.remove('employee');
    this.router.navigate(['/loginem']);
  }
}
