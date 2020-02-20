import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email="";
  message: any = "";
  constructor(public modalController:ModalController,
    public alertCtrl: AlertController,) { }
  ngOnInit() {
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  // resetPassword() {
  //   var auth = firebase.auth();
  //     return auth.sendPasswordResetEmail(this.email)
  //     .then(() => console.log("email sent"),
  //     //  this.doneReset
  //     )
  //     .catch((error) => {
  //       this.message = error.message;
  //     })
    
      
  // }

  resetPassword() {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(this.email)
      .then(async () => 
      {
        const alert = await this.alertCtrl.create({
          header: '',
          subHeader: '',
          message: 'Message sent check your email',
          buttons: ['OK']
        });
    
        await alert.present();
        setTimeout(() => {
          this.dismiss()
        }, 1000)
      }
      )
      .catch((error) => {
        this.message = error.message;
      })
      
  }


}