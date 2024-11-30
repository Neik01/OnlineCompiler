import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { codeMirrorLanguages, codeMirrorThemes } from 'src/app/Constant/constant';
import { CodeRoom } from 'src/app/Model/EntityResponse';
import { SubscribeNotify } from 'src/app/Model/Message';
import { CoderoomService } from 'src/app/services/coderoom.service';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { UtilService } from 'src/app/services/util.service';
import { WebsocketService } from 'src/app/services/websocket.service';

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

  menu ="new";
  users =[];
  username = ""
  codemirrorModes = codeMirrorLanguages;
  codemirrorThemes = codeMirrorThemes;
  selectedMimeType =""
  selectedTheme =""
  showSettings = false;
  sharedFiles=[];
  constructor(public utilService:UtilService,
    public codeRoomService:CoderoomService,
    public websocketService:WebsocketService,
    public router:Router,
    // public authService:AuthService,
    public kcService:KeycloakService
  ){
    
  }
 

  ngOnInit(): void {
      this.utilService.getSidebarStatus().subscribe(value => this.isOpen=value);
      this.codeRoomService.getAll().subscribe(data=>this.data=data);
      
      const localTheme = localStorage.getItem('theme')
      this.codeRoomService.getCMTheme().subscribe(theme => this.selectedTheme = theme || localTheme || 'dracula');
      this.codeRoomService.getCMMode().subscribe(mode => this.selectedMimeType = mode);
      this.codeRoomService.getAllSharedFiles().subscribe(files => this.sharedFiles = files);

      this.username = this.kcService.profile.username;

      this.codeRoomService.getRouteId().subscribe(value=>{
        this.showSettings = true;
        if(value!=""){
          this.websocketService.subscribe("/topic/"+value+"/users",res=>{
            const mes:SubscribeNotify = JSON.parse(res.body);
          
            this.users= mes.userList;
            
          })
        }
        else{
          this.showSettings = false;
        }
      })
  }


  close(){
    this.utilService.setSidebarStatus(false)
  }

  open(){
    this.utilService.setSidebarStatus(true)
  }

  openFile(){
    this.menu="new"
    this.open();
  }

  newFile(){
    this.menu="new"
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

  showUsers(){
    this.open()
    this.menu='users';
  }

  openSettings(){
    this.open()
    this.menu = 'settings'
  }

  onLanguageChange(){
    console.log(this.selectedMimeType);
    this.codeRoomService.setCMMode(this.selectedMimeType);

    this.codeRoomService.updateField('language',this.selectedMimeType).subscribe(value => console.log(value));
  }

  onThemeChange(){
    
    this.codeRoomService.setCMTheme(this.selectedTheme);
  }
}
