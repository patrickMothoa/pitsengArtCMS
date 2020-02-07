import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { ProfilePage } from 'src/app/pages/profile/profile.page';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    this.ConfirmationAlert();
    firebase.auth().signOut().then(()=> {
      // Sign-out successful.
      this.router.navigateByUrl('/login');
    }).catch((error)=> {
      // An error happened.
    });
  }


  ConfirmationAlert(){
    Swal.fire({
      title: 'Are you sure you want to logout?',
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      },
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#06A94D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Logout!',
          'Your have logged out .',
          'success'
        )
      }
    })
   }
}
