import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public singUpForms = new FormGroup({
  
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+@[a-z]{2,6}.[a-z]{2,4}')]),
    password: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]{6,}')])
  })
  public loginForms = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+@[a-z]{2,6}.[a-z]{2,4}')]),
    password: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]{6,}')])
  })
  
  singStatus:boolean=false;
  loginErr:boolean=false;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  public singUp(formData: FormData) {
    console.log(formData);
    this.auth.singUp( formData['email'], formData['password'])
  }

  public login(formData: FormData) {
    console.log(formData);
    this.auth.login( formData['email'], formData['password'])
    this.auth.loginError.subscribe(data=>{
      this.loginErr=data;
      console.log(this.loginErr)
    })
  }

  btnStatus(){
    this.singStatus=!this.singStatus
  }

}
