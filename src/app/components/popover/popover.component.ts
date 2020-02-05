import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { ProfilePage } from 'src/app/pages/profile/profile.page';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(   public modalController: ModalController,  
    public popoverController: PopoverController,
    private router: Router,) { }

  ngOnInit() {}
  async createProfile() {
    const modal = await this.modalController.create({
      component:ProfilePage,
      cssClass: 'profile',
      
    
    });
    return await modal.present();
  }
  DismissClick(){
    this.popoverController.dismiss({
      'dismissed':true
    });
  }
  logOut(){
    firebase.auth().signOut().then(()=> {
      // Sign-out successful.
      this.router.navigateByUrl('/login');
    }).catch((error)=> {
      // An error happened.
    });
  }
}
