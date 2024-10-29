import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  serverError =""
  constructor(private fb: FormBuilder,
              private authService:AuthService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      
      this.authService.register(this.registerForm.value).subscribe(
      {
        next:(res:string) =>{
          alert("Đăng ký thành công")
          this.router.navigateByUrl("/auth/login");
          
        },
        error:(res:any)=>{
          console.log(res);
          
          this.serverError=res.error.message;
          
        }
      }
        

      );

    } else {
      console.log('Form Invalid');
      this.registerForm.markAllAsTouched()
    }
  }

  // Helper method to check if passwords match
  passwordsMatch(): boolean {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;
  }
}
