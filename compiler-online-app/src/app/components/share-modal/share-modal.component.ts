import { Component, OnInit } from '@angular/core';
import { CoderoomService } from 'src/app/services/coderoom.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.css']
})
export class ShareModalComponent implements OnInit{

  isModalOpen = false;
  shareLink = window.location.href; 


  constructor(private utilService:UtilService
  ){}
  ngOnInit(): void {

    this.utilService.getModalState().subscribe(value=>{
      this.shareLink=window.location.href;
      this.isModalOpen=value
    })

  
  }

  close(){
    this.utilService.setModalState(false);

  }
  copyLink(){
    navigator.clipboard.writeText(this.shareLink);
    alert('Link copied to clipboard!');

  }

  showModal(){
    this.utilService.setModalState(true)
  }

  
}
