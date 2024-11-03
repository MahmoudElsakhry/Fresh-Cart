
import { Routes } from '@angular/router';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { producerAccessed } from '@angular/core/primitives/signals';
import { ProductsComponent } from './layout/pages/products/products.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { ForgetpasswordComponent } from './layout/additions/forgetpassword/forgetpassword.component';
import { authGuardGuard } from './shared/guards/auth-guard.guard';
import { logedGuard } from './shared/guards/loged.guard';
import { DetailsProductComponent } from './layout/addition/details-product/details-product.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { AllordersComponent } from './layout/allorders/allorders.component';
import { OrdersComponent } from './layout/orders/orders.component';


export const routes: Routes = [
    {path:'',redirectTo:'login', pathMatch:'full' },
    {path:'login', component:LoginComponent, canActivate:[logedGuard] },
    {path:'forgetpassword', component:ForgetpasswordComponent},
    {path:'register' , component:RegisterComponent, canActivate:[logedGuard]},
   
    {path:'home', component:HomeComponent, canActivate:[authGuardGuard]},
    {path:'cart', component:CartComponent, canActivate:[authGuardGuard]},
    {path:'products', component:ProductsComponent, canActivate:[authGuardGuard] },
    {path:'brands', component:BrandsComponent, canActivate:[authGuardGuard]},
    {path:'categories', component:CategoriesComponent, canActivate:[authGuardGuard]},
    {path:'product-details/:id', component:ProductDetailsComponent},
    {path:'allorders' , component:AllordersComponent},
    {path:'orders/:id', component:OrdersComponent},
    {path:'**', component:NotfoundComponent}

];
