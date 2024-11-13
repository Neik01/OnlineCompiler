import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmptyRoomComponent } from './components/empty-room/empty-room.component';
import { CodeRoomComponent } from './components/code-room/code-room.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { OauthCallbackComponent } from './components/oauth-callback/oauth-callback.component';

const routes: Routes = [

  {
    path:"oauth2/google/callback",component:OauthCallbackComponent
  },
  {path:"code",component:HomePageComponent,canActivate:[authGuardGuard] ,children:[

    {path:"",component:EmptyRoomComponent},
    {path:":id",component:CodeRoomComponent}
  ]},
  {path:"auth",component:AuthPageComponent,children:[
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent}
  ]},
 
  {path:"",redirectTo:"code",pathMatch:"full"},
  {path:"**",redirectTo:"code"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
