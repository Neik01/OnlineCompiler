import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { WebsocketService } from 'src/app/services/websocket.service';
import * as CodeMirror from 'codemirror';
import { WebsocketMessage } from 'src/app/Model/Message';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Route } from '@angular/router';
import { CoderoomService } from 'src/app/services/coderoom.service';
import { UtilService } from 'src/app/services/util.service';
import { ExecuteCodeService } from 'src/app/services/execute-code.service';
import { codeMirrorLanguages } from 'src/app/Constant/constant';

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
  readonly = false;

  constructor(
    public websocketService: WebsocketService,
    // public authService: AuthService,
    public route: ActivatedRoute,
    public codeRoomService: CoderoomService,
    public utilService:UtilService,
    public codeExecService:ExecuteCodeService
  ) {}

  ngOnInit(): void {
    const theme = localStorage.getItem('theme') || 'dracula';
    this.editorOptions={
        lineNumbers: true,
        theme: theme,
        mode: "text/x-c++src",
        readOnly: false
    }

    this.codeRoomService.getCMMode().subscribe(mode => this.editorOptions['mode']=mode);
    
    this.codeRoomService.getCMTheme().subscribe(theme => theme ==''?'dracula':this.editorOptions['theme']=theme);

    this.websocketService.init();

    this.websocketService.isConnected.subscribe(value=>{
      if(value == true){
        this.route.params.subscribe((data) => {
          this.roomId = data['id'];
          this.subscribeTopic(this.roomId)
          
          this.codeRoomService.getById(this.roomId);

          this.codeRoomService.setRouteId(this.roomId);
        });
      }
      
    })
   
    this.codeRoomService.currentCodeRoom$.subscribe(coderoom=>{
      this.codeRoomService.setCMMode(coderoom.language);
      this.content = coderoom.content;
     
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

  executeCode(){

    const source_code = this.CMInstance.getValue();
   

    const mode = this.editorOptions['mode'];
    const language = codeMirrorLanguages.find(lang =>lang.mime === mode)
    
    this.codeExecService.executeCode(source_code,language.id);
  }

}
