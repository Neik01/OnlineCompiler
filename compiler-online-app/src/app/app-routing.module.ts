import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmptyRoomComponent } from './components/empty-room/empty-room.component';
import { CodeRoomComponent } from './components/code-room/code-room.component';

const routes: Routes = [
  {path:"",component:HomePageComponent, children:[

    {path:"",component:EmptyRoomComponent},
    {path:":id",component:CodeRoomComponent}
  ]},
  {path:"**",redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
