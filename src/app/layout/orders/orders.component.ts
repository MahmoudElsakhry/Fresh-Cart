import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../shared/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);

  orders: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });

  cartID: string | null = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartID = params.get('id');
      },
    });
  }

  orderSubmit() {
    console.log(this.orders.value);
    this._OrdersService.checkOut(this.cartID, this.orders.value).subscribe({
      next: (res) => {
        console.log(res);
        window.open(
          'https://checkout.stripe.com/c/pay/cs_test_a1SOFPYniHZi5iRa36KrwDeoT8dnuwzdWQJVxkBRSYR644i7bRh04wZ8b8#fidkdWxOYHwnPyd1blpxYHZxWjA0SHViYl1ANVYyU2pOX2hVVW9ASmZBUElpa2FLVnBUQGo2UFduUEhIXHx9aEhjanBGZ1NxZ3RKNVVtXWxcSTJ8Qzx2aWZkUEBpMXJCXVRHTkIxZzBSZmhENTUxYHVKMUpQVycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl',
          '_self'
        );
      },

      error: (err) => console.error(err),
    });
  }
}
