import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private isSidebarOpen = new BehaviorSubject<boolean>(true);

  constructor() { }

  public getSidebarStatus(){
    return this.isSidebarOpen.asObservable();
  }

  public setSidebarStatus(value:boolean){
    this.isSidebarOpen.next(value);
  }
}
