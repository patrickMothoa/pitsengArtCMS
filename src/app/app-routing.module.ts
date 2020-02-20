import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
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
    path:'pro',
    loadChildren: () => import('./pages/pro/pro.module').then( m => m.ProPageModule)
  },
  {
    path: 'user-invoices',
    loadChildren: () => import('./pages/user-invoices/user-invoices.module').then( m => m.UserInvoicesPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then( m => m.DemoPageModule)
  },
  {
    path: 'order-details',
    loadChildren: () => import('./pages/order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'sow-data',
    loadChildren: () => import('./sow-data/sow-data.module').then( m => m.SowDataPageModule)
  },
  {
    path: 'categorylist',
    loadChildren: () => import('./pages/categorylist/categorylist.module').then( m => m.CategorylistPageModule)
  },
  {
    path: 'quries',
    loadChildren: () => import('./pages/quries/quries.module').then( m => m.QuriesPageModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./pages/faqs/faqs.module').then( m => m.FaqsPageModule)
  },
  {
    path: 'aobut-us',
    loadChildren: () => import('./pages/aobut-us/aobut-us.module').then( m => m.AobutUsPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },  {
    path: 'specials',
    loadChildren: () => import('./pages/specials/specials.module').then( m => m.SpecialsPageModule)
  },

  // {
  //   path: 'spacials',
  //   loadChildren: () => import('./pages/spacials/spacials.module').then( m => m.SpacialsPageModule)
  // },

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
