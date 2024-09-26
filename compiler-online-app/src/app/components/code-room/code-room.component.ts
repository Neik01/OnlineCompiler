import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { WebsocketService } from 'src/app/services/websocket.service';
import * as CodeMirror from 'codemirror';
import { WebsocketMessage } from 'src/app/Model/Message';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Route } from '@angular/router';
import { CoderoomService } from 'src/app/services/coderoom.service';


@Component({
  selector: 'app-code-room',
  templateUrl: './code-room.component.html',
  styleUrls: ['./code-room.component.css']
})
export class CodeRoomComponent implements OnInit{
  content = '';
  CMInstance:CodeMirror.EditorFromTextArea = null;
  roomId =""

  constructor(public websocketService:WebsocketService,
    public authService:AuthService,
    public route:ActivatedRoute,
    public codeRoomService:CoderoomService
  ){}

  ngOnInit(): void {
    this.websocketService.init();

    this.route.params.subscribe(data => {
      
      this.roomId = data["id"]
      this.codeRoomService.getById(data["id"]).subscribe(data=>{
       
        this.content = data.content
      })
    
    })
    
    this.websocketService.isConnected.subscribe((value)=>{
      if(value == true){
        this.websocketService.subscribe('/topic/'+this.route.snapshot.params["id"],(message)=>{
          if(this.CMInstance){
            const msg:WebsocketMessage = JSON.parse(message._body)

            const user = localStorage.getItem('userId');
            
            if(user!=msg.userId){
              this.CMInstance.setValue(msg.content);
            }
             
          }
        });
      }
    })
   
  }

  getCMInstance(editor:CodemirrorComponent){
  
    this.CMInstance = editor.codeMirror;
    this.getAndSendDoc(editor);
    
  }

  private getAndSendDoc(editor: CodemirrorComponent) {
    editor.codeMirror.on('change', (instance, changes) => {
       
        if(changes.origin!=="setValue"){
          const value = instance.getValue().toString();
          
          const roomId = this.route.snapshot.params["id"]
          console.log(roomId);
          this.websocketService.sendMessage('/app/code-message',
            {'roomId':roomId,'content':value,'userId':localStorage.getItem('userId')});
       
        }
    });
  }
}
