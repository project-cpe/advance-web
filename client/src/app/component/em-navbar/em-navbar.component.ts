import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-em-navbar',
  templateUrl: './em-navbar.component.html',
  styleUrls: ['./em-navbar.component.css'],
})
export class EmNavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  getUsername() {
    let user = localStorage.getItem('Emusername');
    return user;
  }

  Logout() {
    localStorage.removeItem('Emusername');
    localStorage.removeItem('Empassword');
    this.router.navigate(['/loginem']);
  }
}
