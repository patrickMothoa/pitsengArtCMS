import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  // },
  {
    path: 'upload',
    loadChildren: () => import('./pages/upload/upload.module').then( m => m.UploadPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path:'add-product',
    loadChildren: () => import('./pages/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'user-invoices',
    loadChildren: () => import('./pages/user-invoices/user-invoices.module').then( m => m.UserInvoicesPageModule)
  },
  // {
  //   path: 'details',
  //   loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  // },
  // {
  //   path: 'product-details',
  //   loadChildren: () => import('./pages/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
