import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private _HttpClient: HttpClient) {}
  myHeader: any = { token: localStorage.getItem('userData') };
  checkOut(idCart:string | null, shippingAddress:object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${idCart}?url=http://localhost:4200`
    ,
    {"shippingAddress":shippingAddress},
    {
      headers: this.myHeader
    }
  );
  }
}
