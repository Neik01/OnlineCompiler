import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.css']
})
export class OauthCallbackComponent implements OnInit{

  constructor(public authService:AuthService, public route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParamMap
    .subscribe(params => {
      console.log(params["code"]);

      if (params.get("code") !== undefined) {
        console.log("yes code");
        
        this.authService.getGoogleToken(params.get("code") ).subscribe(result => {
          if (result === true) {
            this.authService.setLoginState()
            window.location.href = 'http://localhost:4200/code'
          }
        });
      }
      else
        console.log("No code");
        
    }
  );
  }

}
