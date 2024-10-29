import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private isSidebarOpen = new BehaviorSubject<boolean>(true);
 
  private isShareModalOpen = new BehaviorSubject<boolean>(false);
 

  constructor() { }

  public getSidebarStatus(){
    return this.isSidebarOpen.asObservable();
  }

  public setSidebarStatus(value:boolean){
    this.isSidebarOpen.next(value);
  }

  

  public getModalState(){
    return this.isShareModalOpen.asObservable();
  }

  public setModalState(value:boolean){
    this.isShareModalOpen.next(value);
  }

  
}
