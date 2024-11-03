import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Enviroment } from '../../base/enviroment';

@Injectable({
  providedIn: 'root',
})



export class CartService {
  constructor(private _HttpClient: HttpClient) { }

  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);
  
  // myHeader: any = { token: localStorage.getItem('userData') };

  addProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${Enviroment.BaseUrl}/api/v1/cart`,
      //body
      {
        productId: id,
      }, 
      //header
      // {
      //   headers: this.myHeader
      // }
    );
  }

  getProductCart():Observable<any>{
    return this._HttpClient.get(`${Enviroment.BaseUrl}/api/v1/cart` ,
      // {
      //   headers: this.myHeader
      // }
     )
  }

  removeSpecificProduct(id:string):Observable<any>{
    return this._HttpClient.delete(`${Enviroment.BaseUrl}/api/v1/cart/${id}`, 
      // {
      //   headers: this.myHeader
      // }
    )
  }

  updateProductQuantity(id:string, newCount:number):Observable<any>{
    return this._HttpClient.put(`${Enviroment.BaseUrl}/api/v1/cart/${id}`, 
      //body
      {
        "count": newCount
      },
      //header
      // {
      //   headers: this.myHeader
      // }
    )
  }

  clearUserCart():Observable<any>{
    return this._HttpClient.delete(`${Enviroment.BaseUrl}/api/v1/cart`,
      // {
      // headers: this.myHeader }
    )
  }
}
