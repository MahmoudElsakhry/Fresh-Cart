import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { Product } from '../../../shared/interfaces/product';



@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  productID : any = ''
  // productDetails : Product = {} as Product 
  productDetails : Product | null = null;

 ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (params) => {
      this.productID = params.get('id')

      //Call API Specific 

      this._ProductsService.getSpecProductApi(this.productID).subscribe({
        next: (res)=>{
          this.productDetails = res.data
        },
        error:()=>{
          console.log('Error')
        }
      })
      }
  })

   
 }
}
