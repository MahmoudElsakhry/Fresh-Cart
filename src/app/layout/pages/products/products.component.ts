import { Component, computed, OnInit, signal } from '@angular/core';
import { single } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  price:any  = signal<number>(100)
  quan :any = signal<number>(1000).asReadonly(); 

  all_value: any ; 

ngOnInit(): void {
  this.all_value = computed(()=>this.price() * this.quan)
  this.price.set(50)
}


}
