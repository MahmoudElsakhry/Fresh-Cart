import { NavbarComponent } from './../../additions/navbar/navbar.component';
import { routes } from './../../../app.routes';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required ,Validators.email]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][0-9]{6}/)]),

  })

  constructor(private _AuthService:AuthService, private _Router:Router){}

  errorMessage : string = ''
  isLoading :boolean = false;

  

  loginSubmit(){
    this.isLoading = true;
    this._AuthService.sendLogin(this.loginForm.value).subscribe({

      next: (res) => {console.log(res) 

        this.isLoading = false 

        //1

        localStorage.setItem('userData' , res.token)
        //2

        this._AuthService.userInformation()
        //3
        
        this._Router.navigate(['home'])
      }
      ,
      error: (err) =>{ this.errorMessage = err.error.message 
      this.isLoading= false}
    })
  }


}
