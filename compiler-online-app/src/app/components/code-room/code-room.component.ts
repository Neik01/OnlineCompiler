import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';

@Component({
  selector: 'app-code-room',
  templateUrl: './code-room.component.html',
  styleUrls: ['./code-room.component.css']
})
export class CodeRoomComponent{
  content = 'bfkj';

  constructor(){}

  getCMInstance(editor:CodemirrorComponent){
    console.log(editor.codeMirror);
    editor.codeMirror.on('change',(instance,changes)=>{

      console.log(changes);
      console.log(instance.getValue());
    })
    
  }

  onModelChange(){
    // console.log("Content:"+this.content);
    
  }
}
