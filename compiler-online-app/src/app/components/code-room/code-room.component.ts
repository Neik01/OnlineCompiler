import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-code-room',
  templateUrl: './code-room.component.html',
  styleUrls: ['./code-room.component.css'],
})
export class CodeRoomComponent implements OnInit {
  content = '';
  CMInstance: CodeMirror.EditorFromTextArea = null;
  roomId = '';
  editorOptions={}
  constructor(
    public websocketService: WebsocketService,
    public authService: AuthService,
    public route: ActivatedRoute,
    public codeRoomService: CoderoomService,
    public utilService:UtilService
  ) {}

  ngOnInit(): void {

    this.editorOptions={
      lineNumbers: true,
        theme: 'material',
        mode: 'text/x-c++src'
    }

    this.utilService.getCMMode().subscribe(mode => this.editorOptions['mode']=mode)

    this.websocketService.init();

    this.websocketService.isConnected.subscribe(value=>{
      if(value == true){
        this.route.params.subscribe((data) => {
          this.roomId = data['id'];
          this.subscribeTopic(this.roomId)
          
          this.codeRoomService.getById(this.roomId).subscribe((data) => {
            this.content = data.content;
    
          });

          this.utilService.setRouteId(this.roomId);
        });
      }
      
    })
   
  }

  subscribeTopic(id:string){
    
    this.websocketService.subscribe(
      '/topic/' + id,
      (message) => {
        if (this.CMInstance) {
          console.log("Code: "+message);
          
          const msg: WebsocketMessage = JSON.parse(message._body);

          const user = localStorage.getItem('userId');

          if (user != msg.userId) {
            this.CMInstance.setValue(msg.content);
          }
        }
      }
    );
  }

  getCMInstance(editor: CodemirrorComponent) {
    this.CMInstance = editor.codeMirror;
    this.getAndSendDoc(editor);
  }

  private getAndSendDoc(editor: CodemirrorComponent) {
    editor.codeMirror.on('change', (instance, changes) => {
      if (changes.origin !== 'setValue') {
        const value = instance.getValue().toString();

        const roomId = this.route.snapshot.params['id'];
        console.log(roomId);
        this.websocketService.sendMessage('/app/code-message', {
          roomId: roomId,
          content: value,
          userId: localStorage.getItem('userId'),
        });
      }
    });
  }

  setMode(mode:string){
    this.utilService.setCMMode(mode);
  }
}
