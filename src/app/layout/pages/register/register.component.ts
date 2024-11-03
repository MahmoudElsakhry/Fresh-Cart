import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy{

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required,Validators.minLength(3) ,Validators.maxLength(20)]),
    email : new FormControl(null, [Validators.required ,Validators.email]),
    phone: new FormControl(null, [Validators.required ,Validators.pattern(/^(010|011|012)[0-9]{8}$/)]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][0-9]{6}/)]),
    rePassword : new FormControl(null , [Validators.required, Validators.pattern(/^[A-Z][0-9]{6}/)])
    

  },this.confirmPassword)


  constructor(private _AuthService:AuthService , private _Router:Router ){}

  errorMessage : string = ''
  registerSubscribtion !: Subscription  // = new subcribtion ()

  isLoading : boolean = false ;

  confirmPassword(g:any){
    if(g.get('password').value === g.get('rePassword').value){
      return g.error = null         // g.error ???
      
    }else {
      return g.error = {'passMatched':true}          // g.error ???
    }
  }

  registerSubmit(){
    this.isLoading = true ;
    this.registerSubscribtion = this._AuthService.sendRegister(this.registerForm.value).subscribe({
      next: (res)=>{console.log(res)
        this.isLoading = false ;
        this._Router.navigate(['login'])
      },

      error: (err)=>{this.errorMessage = err.error.message
        this.isLoading = false ;
      }
  
    })
  }

  ngOnDestroy(): void {
    
    this.registerSubscribtion?.unsubscribe()
  }
  

}
