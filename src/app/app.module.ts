import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { OrderComponent } from './pages/order/order.component';
import { NewCollectionComponent } from './pages/new-collection/new-collection.component';

import { LoginComponent } from './pages/login/login.component';

import { AdminComponent } from './admin/admin.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminSalesComponent } from './admin/admin-sales/admin-sales.component';
import { AdminNewCollectionComponent } from './admin/admin-new-collection/admin-new-collection.component';
import { AdminSubCategoryComponent } from './admin/admin-sub-category/admin-sub-category.component';


import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { UserComponent } from './pages/user/user.component';
import { UserAboutComponent } from './pages/user/user-about/user-about.component';
import { UserOrdersComponent } from './pages/user/user-orders/user-orders.component';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import {  ngxUiLoaderConfig } from './preloader-config';
import { RouterModule } from '@angular/router';
import {  } from '@angular/router';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ScaleBlockDirective } from './shared/directives/scale-block.directive';



const phone: Partial<IConfig> = {
  validation: true,
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    AdminComponent,
    AdminProductComponent,
    AdminOrdersComponent,
    AdminSalesComponent,
    SalesComponent,
    ProductDetailsComponent,
    OrderComponent,
    NewCollectionComponent,
    AdminNewCollectionComponent,
    AdminSubCategoryComponent,
    LoginComponent,
    UserComponent,
    UserAboutComponent,
    UserOrdersComponent,
    ScaleBlockDirective
 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    Ng5SliderModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig), 
    NgxUiLoaderRouterModule,
    NgxMaskModule.forRoot(phone),
  
    
    
   
   
  
  ],

   

  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { 

}
