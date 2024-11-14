import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from './services/websocket.service';
import { AuthService } from './services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(public authService:AuthService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.authService.setLoginState();
    
  }

  
}
