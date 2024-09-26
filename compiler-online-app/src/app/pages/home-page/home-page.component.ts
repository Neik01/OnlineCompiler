import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  isSidebarOpen:boolean =false;

  constructor(public utilSerivce:UtilService){}

  ngOnInit(): void {
      this.utilSerivce.getSidebarStatus().subscribe(value =>this.isSidebarOpen=value)
  }
}
