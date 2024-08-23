import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';

@Component({
  selector: 'app-code-room',
  templateUrl: './code-room.component.html',
  styleUrls: ['./code-room.component.css']
})
export class CodeRoomComponent{
  content = '';
}
