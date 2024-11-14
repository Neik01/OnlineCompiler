import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/EntityResponse';
import { LoginResponse } from 'src/app/Model/LoginResponse';
import { AuthService } from 'src/app/services/auth.service';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  loginForm:FormGroup;
  googleUrl = ""

  constructor(private fb:FormBuilder,
              private websocketService:WebsocketService,
              // private authService:AuthService,
              private router:Router,
              private kcService:KeycloakService
  ){}

  async ngOnInit(): Promise<void> {
    // this.loginForm=this.fb.group({
    //   email:[''],
    //   password:['']
    // })

    // this.authService.getGoogleLoginUrl().subscribe((data:any) => this.googleUrl = data.authUrl) 

    await this.kcService.init();
    await this.kcService.login();
  }

  onSubmit(){

    const userEmail = this.loginForm.get('email').value
    const userPassword = this.loginForm.get('password').value
 
    // this.authService.login(userEmail,userPassword).subscribe((msg:LoginResponse) =>{
      
    //   localStorage.setItem("jwtToken",msg.token);
      
    //   const user:User = {id:msg.id,email:msg.email,username:msg.username}
    //   this.authService.user.next(user);
    //   this.authService.setLoginState();
    //   const redirectUrl = this.authService.redirectUrl||"/code"
    //   this.authService.redirectUrl = null
    //   this.router.navigateByUrl(redirectUrl);
    // });
  }

 
}
