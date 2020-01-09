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


var firebaseConfig = {
  apiKey: "AIzaSyDRwZjjA37ZlERum6-XfR1YKNxHjYcZfRc",
    authDomain: "pitseng.firebaseapp.com",
    databaseURL: "https://pitseng.firebaseio.com",
    projectId: "pitseng",
    storageBucket: "pitseng.appspot.com",
    messagingSenderId: "480621678215",
    appId: "1:480621678215:web:78d00062aeaf3f478f3222",
    measurementId: "G-CMHGYBB83X"
};
firebase.initializeApp(firebaseConfig);
  firebase.analytics();

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,FormsModule, ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule, DetailsPageModule,OrderDetailsPageModule, SowDataPageModule],
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
