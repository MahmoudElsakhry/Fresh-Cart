import { ICategory } from './../../../shared/interfaces/icategory';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { Product } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../shared/services/category.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { OnSalePipe } from '../../../shared/pipes/on-sale.pipe';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CarouselModule,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    OnSalePipe,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _ProductsService: ProductsService,
    private _CategoryService: CategoryService,
    private _CartService: CartService, 
    private _ToastrService:ToastrService,
    private _NgxSpinnerService : NgxSpinnerService
  ) {}

  allProducts: Product[] = [];
  allCategory: ICategory[] = [];
  getAllProductSubscribtion!: Subscription;

  text: string = '';

  // ngOnInit(): void {
  //   if (typeof localStorage !== 'undefined') {
  //     localStorage.setItem('currentPage' , '/home')
  //   }

  // }
  customOptionsMainStatic: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl:true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  customOptionsCategory: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl:true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 1500,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    // this._NgxSpinnerService.show('loading one')
    this._CategoryService.getCategory().subscribe({
      next: (res) => {
        this.allCategory = res.data;
        // this._NgxSpinnerService.hide('loading one')
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.getAllProductSubscribtion = this._ProductsService
      .getAllProductsApi()
      .subscribe({
        next: (res) => {
          this.allProducts = res.data;
        },
        error: (err) => console.error(err),

        complete: () => {
          console.log(this.allProducts);
        },
      });
  }

  //unSubscribe
  ngOnDestroy(): void {
    this.getAllProductSubscribtion?.unsubscribe();
    console.log('unsubsribe');
  }
  addToCart(id: string) {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, "Fresh Cart")
        this._CartService.cartNumber.next(res.numOfCartItems)
        console.log(this._CartService.cartNumber);
        
      },
      error: (err) => console.error(err),
    });
  }
}
