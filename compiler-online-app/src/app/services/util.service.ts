import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private isSidebarOpen = new BehaviorSubject<boolean>(true);
  private routeId = new BehaviorSubject<string>("");
  private isShareModalOpen = new BehaviorSubject<boolean>(false);
  private codemirrorMode = new BehaviorSubject<string>("");

  constructor() { }

  public getSidebarStatus(){
    return this.isSidebarOpen.asObservable();
  }

  public setSidebarStatus(value:boolean){
    this.isSidebarOpen.next(value);
  }

  public getRouteId(){
  
    return this.routeId.asObservable();
  }

  public setRouteId(id:string){
    this.routeId.next(id);
  }


  public getModalState(){
    return this.isShareModalOpen.asObservable();
  }

  public setModalState(value:boolean){
    this.isShareModalOpen.next(value);
  }

  public setCMMode(mode:string){
    this.codemirrorMode.next(mode);
  }

  public getCMMode(){
    return this.codemirrorMode.asObservable();
  }
}
