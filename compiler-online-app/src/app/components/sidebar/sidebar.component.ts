import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CodeRoom } from 'src/app/Model/EntityResponse';
import { CoderoomService } from 'src/app/services/coderoom.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  isOpen;
  isAddNew = false;
  data:CodeRoom[] =[];
  @ViewChild('inputElement') inputElement!: ElementRef;
  enterKeyPressed:boolean = false;

  constructor(public utilService:UtilService,
    public codeRoomService:CoderoomService
  ){

  }

  ngOnInit(): void {
      this.utilService.getSidebarStatus().subscribe(value => this.isOpen=value);
      this.codeRoomService.getAll().subscribe(data=> {
        console.log(data);
        
        this.data=data
      });
  }

  close(){
    this.utilService.setSidebarStatus(false)
  }

  open(){
    this.utilService.setSidebarStatus(true)

  }

  newFile(){
    this.open();
    this.isAddNew=true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 0);
  }

  saveFile(event:any){

    this.isAddNew=false;

    const name:string = event.target.value
    if((name.trim()).length!=0)
      this.codeRoomService.addCoderoom(name).subscribe(res => this.data.push(res));
  }

  onBlur(event:any){

    if(this.enterKeyPressed){
      return
    }
    this.saveFile(event)
  }

  onEnterPressed(event:any){
    this.enterKeyPressed = true;
    this.saveFile(event);
    
    
    setTimeout(() => this.enterKeyPressed = false, 0);
  }
}
