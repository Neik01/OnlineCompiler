import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExecuteCodeService } from 'src/app/services/execute-code.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit{
  private firstClick = true;
  stdin =""
  stderr = ""

  stdout =""
  isLoading = false;
  constructor(public codeExecService:ExecuteCodeService){}

  ngOnInit(): void {
      this.codeExecService.getOutput().subscribe(output => this.stdout = output);
      this.codeExecService.isLoading.subscribe(loading => this.isLoading=loading)
  }
  
  
  placeCursorAtStart(textarea: HTMLTextAreaElement) {
    if (this.firstClick) {
      textarea.setSelectionRange(0, 0); // Set cursor to the start
      this.firstClick = false;          // Ensure this only happens on the first click
    }
  }

  inputChange(){
    this.codeExecService.stdin = this.stdin;
  }
  
}
