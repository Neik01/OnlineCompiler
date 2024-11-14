import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js'
import { UserInfo } from '../Model/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak:Keycloak|undefined;
  private _profile:UserInfo|undefined;

  get keycloak(){
    if(!this._keycloak){
      this._keycloak = new Keycloak({
        url:"http://localhost:8081",
        realm:"codeshare",
        clientId:"codeshare"
      })
    }

    return this._keycloak;
  }

  get profile(){
    return this._profile;
  }

  constructor() { }

  async init(){
    const authenticate = await this.keycloak?.init({
      onLoad:"login-required"
    })
    
   
    if(authenticate){
      this._profile = (await this.keycloak?.loadUserProfile()) as UserInfo;
      this._profile.token = this.keycloak?.token;
    }
  }

  login(){
    return this.keycloak.login();
  }

  logout(){
    return this.keycloak.logout({redirectUri:"http://localhost:4200"});
  }
}
