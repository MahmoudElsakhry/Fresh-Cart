import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../base/enviroment';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) {}

  getAllProductsApi(): Observable<any>{
    return this._HttpClient.get(`${Enviroment.BaseUrl}/api/v1/products`)

  }

  getSpecProductApi(pID:string):Observable<any>{
    return this._HttpClient.get(`${Enviroment.BaseUrl}/api/v1/products/${pID}`)

  }



}
