import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/Model/LoginResponse';
import { AuthService } from 'src/app/services/auth.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  loginForm:FormGroup;

  constructor(private fb:FormBuilder,
              private websocketService:WebsocketService,
              private authService:AuthService,
              private router:Router
  ){}

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:[''],
      password:['']
    })
  }

  onSubmit(){

    const userEmail = this.loginForm.get('email').value
    const userPassword = this.loginForm.get('password').value
 
    this.authService.login(userEmail,userPassword).subscribe((msg:LoginResponse) =>{
      
      localStorage.setItem("jwtToken",msg.token);
      localStorage.setItem("userEmail",msg.email);
      localStorage.setItem("userUsername",msg.username)
      localStorage.setItem("userId",msg.id)
      
      this.authService.getLoginState();
      this.router.navigateByUrl("/code");
    });
  }
}
