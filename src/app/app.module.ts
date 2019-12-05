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


const firebaseConfig = {
  apiKey: "AIzaSyB1es8iP2ZqtEUH8TJCa9HRDU7yjgRcuqs",
  authDomain: "pitsengart.firebaseapp.com",
  databaseURL: "https://pitsengart.firebaseio.com",
  projectId: "pitsengart",
  storageBucket: "pitsengart.appspot.com",
  messagingSenderId: "381927677673",
  appId: "1:381927677673:web:0c7a2746479e8fda33da78",
  measurementId: "G-3KKJYT38C2"
};
firebase.initializeApp(firebaseConfig);
  firebase.analytics();

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,FormsModule, ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule, DetailsPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
