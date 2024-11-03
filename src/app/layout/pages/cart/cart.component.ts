import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { Icart } from '../../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  private readonly _CartService = inject(CartService)

  cartDetails :Icart = {} as Icart

  ngOnInit(): void {
    this._CartService.getProductCart().subscribe({
      next: (res) =>{ console.log(res.data)
        this.cartDetails = res.data
      }
      ,
      error: (error) => console.error(error)
    })
  }

  removeThisProduct(id:string):void{
    this._CartService.removeSpecificProduct(id).subscribe({
      next: (res)=>{console.log('DELETED');
        this.cartDetails = res.data
      }, 
      error: (error) => console.error(error)
    })
  }
 
  updateCount(id:string , newCount:number):void{
    this._CartService.updateProductQuantity(id , newCount).subscribe({
      next: (res)=>{console.log(res)
        this.cartDetails = res.data
      } 
       ,
      error: (error) => console.error(error)

    })

  }

  clearCart():void{
    this._CartService.clearUserCart().subscribe({
      next:(res)=>{console.log(res);
        this.cartDetails = res
      },
      error: (error) => console.error(error)
    })
  }

}
