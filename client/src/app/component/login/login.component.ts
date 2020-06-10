import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/service/register.service';
import { Router} from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  googleUrl: string;
  facebookUrl: string;
  dataUser: any;

  dataLogin = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private registerService: RegisterService, private router: Router, public local: LocalStorageService) { }

  loginPass: Boolean = false;

  ngOnInit(): void {
    this.googleUrl="http://www.google.com";
    this.facebookUrl="http://www.facebook.com";
  }

  getUrlFacebook(){
    return this.facebookUrl;
  }

  Login() {
    const data = {
      password: this.dataLogin.value.password,
      username: this.dataLogin.value.username
    };
    if(data.password !== '' && data.username !== '') {
      this.registerService.findByUser(data.username, data.password)
        .subscribe(
          response => {
              console.log(response);
              this.dataUser = response;
              if(this.dataUser.status == true){
                this.local.set('customer',this.dataUser,1,'w');
              // localStorage.setItem("username",this.dataUser.result.username);
              // localStorage.setItem("password",this.dataUser.result.password);
                this.loginPass = true;
                alert("i see!");
                this.router.navigate(['/productlist']);
            }
          },
          error => {
            console.log(error);
          });
  }
}

}
