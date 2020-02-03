import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';
import { DetailsPageModule } from './pages/details/details.module';
import { OrderDetailsPageModule } from './pages/order-details/order-details.module';
import { SowDataPageModule } from './sow-data/sow-data.module';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { PopoverComponent } from './components/popover/popover.component';
import { ProfilePageModule } from './pages/profile/profile.module';
import { UserInvoicesPageModule } from './pages/user-invoices/user-invoices.module';
import { AddProductPageModule } from './pages/add-product/add-product.module';


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCEdqt_gOew6SACcVm3xMXETdQxxbdbLJE",
    authDomain: "pitsengproject.firebaseapp.com",
    databaseURL: "https://pitsengproject.firebaseio.com",
    projectId: "pitsengproject",
    storageBucket: "pitsengproject.appspot.com",
    messagingSenderId: "359447010965",
    appId: "1:359447010965:web:30e22a1e055bd366d7c59c",
    measurementId: "G-T4KR75ZKET"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

@NgModule({
  declarations: [AppComponent,PopoverComponent],
  entryComponents: [PopoverComponent],
  imports: [BrowserModule,FormsModule, ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule, DetailsPageModule,OrderDetailsPageModule, 
    SowDataPageModule,ProfilePageModule,UserInvoicesPageModule,AddProductPageModule,DetailsPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
