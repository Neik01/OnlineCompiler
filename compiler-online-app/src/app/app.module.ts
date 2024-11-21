import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CodeRoomComponent } from './components/code-room/code-room.component';
import { EmptyRoomComponent } from './components/empty-room/empty-room.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ShareModalComponent } from './components/share-modal/share-modal.component';
import { OutputComponent } from './components/output/output.component';
// import { OauthCallbackComponent } from './components/oauth-callback/oauth-callback.component';
import { KeycloakService } from './services/keycloak.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';



export function kcFactory(kcService:KeycloakService){
  return ()=> kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomePageComponent,
    CodeRoomComponent,
    EmptyRoomComponent,
    HeaderComponent,
    AuthPageComponent,
    LoginComponent,
    RegisterComponent,
    ShareModalComponent,
    OutputComponent,
    NotFoundComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CodemirrorModule,
    ReactiveFormsModule,
    HttpClientModule,
   
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    {
      provide:APP_INITIALIZER,
      deps:[KeycloakService],
      useFactory:kcFactory,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
