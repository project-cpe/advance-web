import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';

const baseUrl = 'http://localhost:3000/api/employee';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {

  loginPass: Boolean = false;
  dataEmploy: any;

  dataLoginEm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private http: HttpClient,private router: Router, public local: LocalStorageService) { }

  ngOnInit(): void {
  }

  LoginEm(){
    const data = {
      password: this.dataLoginEm.value.password,
      username: this.dataLoginEm.value.username,
    };
    if(data.password !== '' && data.username !== '') {
      this.http.get(`${baseUrl}/${data.username}/${data.password}`)
        .subscribe(
          response => {
            console.log(response);
            this.loginPass = true;
            this.dataEmploy = response;
            this.local.set('employee',this.dataEmploy,1,'w');
            //console.log(this.local.get('employee').token);
            // localStorage.setItem("Emusername",this.dataEmploy.result.username);
            // localStorage.setItem("Empassword",this.dataEmploy.result.password);
            alert("Welcome To Employee!");
            this.router.navigate(['/addlist']);
          },
          error => {
            console.log(error);
          });
    }
  }



}
