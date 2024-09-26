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
  public isConnected = new BehaviorSubject<boolean>(false);

  public subscribe(destination:string,callbackFn:(message:any)=>void) {
    console.log("subcscribe: " + destination);
    
    this.stompClient?.subscribe(destination, message => {
      console.log('Received: ' + message.body);
      // Handle the received message
      callbackFn(message);
    });
    
  }

  public disconnect() {
    if (this.stompClient !== null) {
     this.stompClient.deactivate().then(()=>{
      console.log('deactivate');
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

  public addUser(){
    const email = localStorage.getItem('email');
    this.stompClient.subscribe(`user/${email}/queue/messages`,message =>{
      console.log('Subscribe user destination: ' + message.body);
      // Handle the received message
    })
  }

  public init(){
  
    const socket = new SockJS('http://localhost:8080/ws'); 
    this.stompClient = Stomp.Stomp.over(socket);
    const token = localStorage.getItem("jwtToken")

    const header:Stomp.StompHeaders ={
      Authorization: `Bearer ${token}`,

    } 

    this.stompClient.connect(
      header, 
      (frame: any) => {
      console.log('Connected: ' + frame);
      this.isConnected.next(true);

    }, 
      (error: any) => {
      console.error('Error: ' + error);
      this.isConnected.next(false);
    });
  }

  
}
