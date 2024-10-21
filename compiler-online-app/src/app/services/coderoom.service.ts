import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from '../Constant/constant';
import { CodeRoom } from '../Model/EntityResponse';

@Injectable({
  providedIn: 'root'
})
export class CoderoomService {

  codeRoomUrl = SERVER_URL+"/code"


  constructor(public httpClient:HttpClient) { }


  addCoderoom(name:string){

    const createUrl = this.codeRoomUrl
    
    return this.httpClient.post<CodeRoom>(createUrl,name);

  }

  getAll(){

    const getAllUrl = this.codeRoomUrl;

    return this.httpClient.get<CodeRoom[]>(getAllUrl);
  }

  getById(id:string){

    const getById = this.codeRoomUrl + "/"+id;

    return this.httpClient.get<CodeRoom>(getById);
  }
}
