import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  
  isCodeForm : boolean = false; 
  isNewPassForm : boolean = false ;
  isLoading : boolean = false;


  emailForm :FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required , Validators.email])
  })

  codeForm : FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required])
  })

  resetPasswordForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required , Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][0-9]{6}/)]),
  })

  verifyBtn(){
    this.isLoading = true;
    this._AuthService.sendVerifyApi(this.emailForm.value).subscribe({
      next: (res) => {
        if(res.statusMsg == 'success'){
          this.isCodeForm = true;
          this.isLoading= false;
        }
      },
      error: (err) => {
        console.log(err);
      }
    })

  }
 
  codeBtn(){
    this.isLoading = true;
    this._AuthService.sendCodeApi(this.codeForm.value).subscribe({
      next: (res) => {
        if(res.status == "Success"){
          this.isCodeForm = false ; 
          this.isNewPassForm = true ;
          this.isLoading = false;
      }
    },
    error: (err) => {console.log(err);}
    
  })

}
newPasswordBtn(){
  this.isLoading = true ;
  this._AuthService.sendNewPasswordApi(this.resetPasswordForm.value).subscribe({
    next: (res) => {
      //1  get token
      localStorage.setItem('userData' , res.token),

      //2 call userinfo method to decode
      this._AuthService.userInformation(),

      //3 Navigate to home
      this._Router.navigate(['home'])

    }
  })

}


}
