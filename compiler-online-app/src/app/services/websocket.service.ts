import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  private stompClient!: Stomp.CompatClient  ;
  private isConnected = new BehaviorSubject<boolean>(false);

  public connect() {
    const socket = new SockJS('http://localhost:8080/ws'); // Adjust URL as needed
    this.stompClient = Stomp.Stomp.over(socket);

    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);
      this.isConnected.next(true);

      // Subscribe to a topic
      this.stompClient?.subscribe('/topic/code', message => {
        console.log('Received: ' + message.body);
        // Handle the received message
      });
    }, (error: any) => {
      console.error('Error: ' + error);
      this.isConnected.next(false);
    });
  }

  public disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
        this.isConnected.next(false);
      });
    }
  }

  public sendMessage(destination: string, body: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({destination:destination, body:JSON.stringify(body)});
    }
  }

  public getConnectionStatus() {
    return this.isConnected.asObservable();
  }
}
