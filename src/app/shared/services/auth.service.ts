import { BehaviorSubject, Observable } from 'rxjs';
import { Enviroment } from './../../base/enviroment';
import { Login, RegisterInterface } from './../interfaces/register-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  userData :BehaviorSubject<any>  = new BehaviorSubject(null) ; 

  sendRegister (data:RegisterInterface) : Observable<any>{
  return  this._HttpClient.post(`${Enviroment.BaseUrl}/api/v1/auth/signup` , data)
  }

  sendLogin (data:Login): Observable<any>{
    return this._HttpClient.post(`${Enviroment.BaseUrl}/api/v1/auth/signin`,data)
  }

  userInformation (){
    
     this.userData.next(jwtDecode(JSON.stringify(localStorage.getItem('userData'))))
    //  console.log(this.userData.getValue());
     
  }

  /* ============== send email =================*/

  sendVerifyApi(data:any) : Observable<any>{
    return this._HttpClient.post(`${Enviroment.BaseUrl}/api/v1/auth/forgotPasswords`, data)
  }

 /* ============== send code =================*/
 sendCodeApi(data:any) : Observable<any>{
  return this._HttpClient.post(`${Enviroment.BaseUrl}/api/v1/auth/verifyResetCode`, data)
 }

 /*===================Reset ================= */
 sendNewPasswordApi(data:any): Observable<any>{
  return this._HttpClient.put(`${Enviroment.BaseUrl}/api/v1/auth/resetPassword`, data)
 }

}
