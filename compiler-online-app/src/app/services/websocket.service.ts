import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';
import { KeycloakService } from './keycloak.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5; 
  public isConnected = new BehaviorSubject<boolean>(false);
  private client: Stomp.Client;
  private server = environment.SERVER_URL;
  constructor(public kc:KeycloakService) { }

  public subscribe(destination:string,callbackFn:(message:any)=>void) {
   
    this.client?.subscribe(destination, message => {
     
      // Handle the received message
      callbackFn(message);
    },{
       Authorization: 'Bearer '+this.kc.profile.token
    });
    
  }

  public disconnect() {
    if (this.client !== null) {
     this.client.deactivate().then(()=>{
      console.log('deactivate');
      this.isConnected.next(false);
     });
    }
  }

  public sendMessage(destination: string, body: any) {
    if (this.client && this.client.connected) {
      this.client.publish({destination:destination, body:JSON.stringify(body)});
    }
  }

  public getConnectionStatus() {
    return this.isConnected.asObservable();
  }

  public addUser(){
    const email = localStorage.getItem('email');
    this.client.subscribe(`user/${email}/queue/messages`,message =>{
      console.log('Subscribe user destination: ' + message.body);
      // Handle the received message
    })
  }

  public init(){
  
    // const socket = new SockJS('http://localhost:8080/ws'); 
    // this.client = Stomp.Stomp.over(socket);

    this.client = new Stomp.Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'), // Create a new instance of SockJS for reconnects
      reconnectDelay: 5000, // Set reconnect delay to 5 seconds
      heartbeatIncoming: 4000, // Optional: set heartbeat interval for incoming messages
      heartbeatOutgoing: 4000, // Optional: set heartbeat interval for outgoing messages
      connectHeaders: {  // Set headers, including Authorization
        Authorization: `Bearer ${this.kc.profile.token}`,
      },
    });


    if (typeof WebSocket !== 'function') {
      // For SockJS you need to set a factory that creates a new SockJS instance
      // to be used for each (re)connect
      this.client.webSocketFactory = function () {
        // Note that the URL is different from the WebSocket URL
        return new SockJS(this.server+'/ws');
      };
    }
    

    this.client.onConnect = (frame:any) =>{
      this.isConnected.next(true)
      this.reconnectAttempts = 0;
    
    };

    this.client.onWebSocketClose = () => {
      // Increment reconnect attempts on each connection failure
      this.reconnectAttempts++;
      console.warn(`Reconnect attempt #${this.reconnectAttempts}`);
      
      // Deactivate client if max reconnect attempts are reached
      if (this.reconnectAttempts > this.maxReconnectAttempts) {
        console.warn('Max reconnect attempts reached. Stopping reconnection.');
        this.client.deactivate(); // Stop further reconnections
        this.isConnected.next(false);
      }
    };

   this.client.onStompError= (frame)=> {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };
  this.client.activate();
  }

  
}
