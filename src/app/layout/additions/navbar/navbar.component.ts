import { Component, inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../../shared/services/my-translate.service';
import { CartService } from '../../../shared/services/cart.service';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  isLogin:boolean = false ;

  private readonly _MyTranslateService = inject(MyTranslateService)

  readonly _TranslateService = inject(TranslateService)

  private readonly _CartService = inject(CartService)

  

  constructor(private _AuthService:AuthService, private _Router:Router){
    

  
  }


  countNumber:number = 0


  ngOnInit(): void {
  //  this.countNumber =  this._CartService.cartNumber.getValue()
  this._CartService.cartNumber.subscribe({
    next: (count) => this.countNumber = count
  })


    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue()==null){
        this.isLogin = false ;
      }else{
        this.isLogin = true ;
      }
    })
 
}


logOut (){
  localStorage.removeItem('userData') ;
  this._AuthService.userData.next(null) ;
  this.isLogin = false ;
  this._Router.navigate(['login']) ;
}

change(lang:string):void{
  this._MyTranslateService.changeLanguage(lang)

}


}
