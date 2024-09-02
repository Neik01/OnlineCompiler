import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private connectionStatusSubscription: Subscription | null = null;

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.websocketService.connect();
    this.connectionStatusSubscription = this.websocketService.getConnectionStatus().subscribe(isConnected => {
      console.log('Connection status: ' + isConnected);
    });
  }

  ngOnDestroy() {
    this.disconnect();
  }

  sendMessage() {
    this.websocketService.sendMessage('/app/edit', { content: 'Angular Client',author:{email:'mail',name:'name'} });
  }

  disconnect(){
    console.log('destroy')
    this.connectionStatusSubscription?.unsubscribe();
    this.websocketService.disconnect();
  }
}
