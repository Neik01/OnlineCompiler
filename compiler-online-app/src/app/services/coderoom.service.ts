import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../Constant/constant';
import { CodeRoom } from '../Model/EntityResponse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoderoomService {

  codeRoomUrl = SERVER_URL+"/code"
  private routeId = new BehaviorSubject<string>("");
  private codemirrorMode = new BehaviorSubject<string>("");
  private codemirrorTheme = new BehaviorSubject<string>("");
  private currentCodeRoom = new BehaviorSubject<CodeRoom>(null);

  constructor(public httpClient:HttpClient) { }


  addCoderoom(name:string){

    const createUrl = this.codeRoomUrl;
    
    return this.httpClient.post<CodeRoom>(createUrl,name);

  }

  getAll(){

    const getAllUrl = this.codeRoomUrl;

    return this.httpClient.get<CodeRoom[]>(getAllUrl);
  }

  getById(id:string){

    const getById = this.codeRoomUrl + "/"+id;

    this.httpClient.get<CodeRoom>(getById).subscribe(coderoom => this.currentCodeRoom.next(coderoom));
  }

  public getRouteId(){
  
    return this.routeId.asObservable();
  }

  public setRouteId(id:string){
    this.routeId.next(id);
  }


  public setCMMode(mode:string){
    this.codemirrorMode.next(mode);
  }

  public getCMMode(){
    return this.codemirrorMode.asObservable();
  }

  public setCMTheme(theme:string){
    localStorage.setItem('theme',theme);
    this.codemirrorTheme.next(theme);

  }

  public getCMTheme(){
    return this.codemirrorTheme.asObservable();
  }

  public updateField(fieldname:string,value:any){
    const updateUrl = this.codeRoomUrl+"/update";
   
    const roomId = this.routeId.getValue();

    return this.httpClient.patch<CodeRoom>(updateUrl+`/${roomId}`,{[fieldname]:value});
  }

  set currentCodeRoomValue(codeRoom: CodeRoom) {
    
    
    this.currentCodeRoom.next(codeRoom);
    
  }

  // Method to get the observable for subscribers
  get currentCodeRoom$() {
    return this.currentCodeRoom.asObservable();
  }
  
  get currentCodeRoomValue(): CodeRoom {
    return this.currentCodeRoom.value;
  }

}
