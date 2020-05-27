import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { OrderComponent } from './pages/order/order.component';
import { NewCollectionComponent } from './pages/new-collection/new-collection.component';

import { UserComponent } from './pages/user/user.component';
import { UserAboutComponent } from './pages/user/user-about/user-about.component';
import { UserOrdersComponent } from './pages/user/user-orders/user-orders.component';
import { LoginComponent } from './pages/login/login.component';

import { AdminComponent } from './admin/admin.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminSalesComponent } from './admin/admin-sales/admin-sales.component';
import { AdminNewCollectionComponent } from './admin/admin-new-collection/admin-new-collection.component';

import { AdminSubCategoryComponent } from './admin/admin-sub-category/admin-sub-category.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserGuard } from './shared/guards/user.guard';




const routes: Routes = [
  {path: 'home', component: HomeComponent},
  { path: 'product/:category', component: ProductComponent},
  { path: 'product/:category/:id', component: ProductDetailsComponent},
  {path: 'sales', component: SalesComponent},
  { path: 'newCollection', component: NewCollectionComponent},
  {path: 'orders', component: OrderComponent},

  {path: 'login', component: LoginComponent},

  {path: 'user', component: UserComponent,  canActivate: [UserGuard],children: [
    {path: '', pathMatch: 'full', redirectTo: 'user-order'},
    {path: 'user-order',  component: UserOrdersComponent},
    {path: 'user-about', component: UserAboutComponent},
  ] },


  {path: 'admin', component: AdminComponent , canActivate: [AuthGuard], children: [
    {path: '', pathMatch: 'full', redirectTo: 'admin-product'},
    {path: 'admin-product', component: AdminProductComponent},
    {path: 'admin-orders', component: AdminOrdersComponent},
    {path: 'admin-sales', component: AdminSalesComponent},
    {path: 'admin-newCollection', component: AdminNewCollectionComponent},
    {path: 'admin-subCategory', component: AdminSubCategoryComponent},
  ]},
  
  // {path: 'home', pathMatch: 'full', redirectTo: 'home'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
