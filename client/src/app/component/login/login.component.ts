import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/service/register.service';
import { Router} from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import Swal from 'sweetalert2'

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
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  get username(){ return this.dataLogin.get('username'); }
  get password(){ return this.dataLogin.get('password'); }

  constructor(private registerService: RegisterService, private router: Router, public local: LocalStorageService) { }

  loginPass: Boolean = false;

  ngOnInit(): void {
    this.googleUrl="http://www.google.com";
    this.facebookUrl="http://www.facebook.com";
  }

  getUrlFacebook(){
    return this.facebookUrl;
  }
  getUsername(){
    let user = this.local.get('customer').result.username;
    return user;
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
                //alert("i see!");
                Swal.fire({
                  icon: 'success',
                  title: 'Wow!...',
                  html:`<a>เข้าสู่ระบบสำเร็จ ยินดีต้อนรับคุณ <u><i><b style="color:red">${this.getUsername()}</b></i></u><a>`
                })
                this.router.navigate(['/productlist']);
            }
          },
          error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops! ...',
              text: 'เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบให้ถูกต้อง'
            })
          });
  }else{
    Swal.fire({
      icon: 'warning',
      title: 'Oops! ...',
      text: 'กรุณากรอกข้อมูลให้ครบ'
    })
  }
}

}
