import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CoderoomService } from 'src/app/services/coderoom.service';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { UtilService } from 'src/app/services/util.service';
import { WebsocketService } from 'src/app/services/websocket.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  roomName ="";
  isLogin =false;
  canShare = false;

  constructor(
              private router:Router,
              private utilService:UtilService,
              private crService:CoderoomService,
              // private authService:AuthService,
              private kcService:KeycloakService
              
  ) {}

  ngOnInit(): void {
    this.crService.getRouteId().subscribe(value=>{
      if(value!=''){
        this.crService.currentCodeRoom$.subscribe(data=>{
          
          this.canShare = true
          this.roomName= data.name;
      })
      }
      else{
        this.canShare = false;
      }
    })
    
    this.kcService.isLoggedIn.subscribe(value => this.isLogin = value);
  }

 navToAuth(){
    this.router.navigateByUrl('auth/login');
 }



  openShareModal() {
    this.utilService.setModalState(true);
  }

  async logout(){
    // this.authService.logout();
    await this.kcService.logout();
    this.router.navigateByUrl("/auth/login")
  }


}
