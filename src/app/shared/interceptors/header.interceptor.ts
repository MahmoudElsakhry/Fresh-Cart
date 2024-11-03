import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '@angular/compiler';



export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  //logic------req-------sendHeader---->>

  // if ( localStorage.getItem('userData')!== null) {

  
  
      
  //   }
    if (req.url.includes('cart')||req.url.includes('wishlist') || req.url.includes('orders') ) {
      req = req.clone({
        setHeaders: { token: localStorage.getItem('userData')! }
      })

  }
  return next(req);
};
