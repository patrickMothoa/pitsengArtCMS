import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationStart } from '@angular/router';
import * as firebase from 'firebase';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showHead: boolean = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private routes: Router
  ) {
    this.initializeApp();
    this.getAuth(); 
     // on route change to '/login', set the variable showHead to false
     routes.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.showHead = false;
        } else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });


  }

  // ngOnInit(){
  //   if (this.routes.url === '/login') {
  //     this.showHead = false
  //     }
  // }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.routes.navigateByUrl('/pro')
      }else {
        this.routes.navigateByUrl('/login')
      }
    })
  }

  // if (this.router.url === '/login') {
  //   this.showComponent = false
  //   }
}
