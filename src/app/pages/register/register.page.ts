import { Component, OnInit, } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public form = [   
    { val: 'small' , isChecked: false},  
    { val: 'medium' , isChecked: false},  
    { val: 'large' , isChecked: false}
  ];

  verificationId: any;
  code = '';
  phone: string;

  constructor(public navCtrl: NavController, public toastController: ToastController) { }

   ngOnInit() {}
  // send() {
  //   const tell = '+27' + this.phone;
  //   (<any> window).FirebasePlugin.verifyPhoneNumber(tell, 60, (credential) => {
  //     console.log(credential);
  //     this.verificationId = credential;
  //   }, (error) => {
  //     console.error(error);
  //     alert(error);
  //    });
  // }

  // verify() {
  //   const signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, this.code);
  //   firebase.auth().signInWithCredential(signInCredential).then((info) => {
  //     console.log(info);
  //     this.navCtrl.navigateRoot('/home'); 
  //   }, (error) => {
  //     console.log(error);
  //   });
  //   }
  //   showToast() {
  //     this.toastController.create({
  //       message: 'Your settings have been saved.',
  //       duration: 2000,
  //       animated: true,
  //       showCloseButton: true,
  //       closeButtonText: "OK",
  //       cssClass: "my-toast",
  //       position: "middle"
  //     }).then((obj) => {
  //       obj.present();
  //     });
  //   }
   
  // lll(){
  //   firebase.auth().signInWithPhoneNumber(this.phone, window.recaptchaVerifier)
  //     .then( (confirmationResult) => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       window.confirmationResult = confirmationResult;
  //     }).catch(function (error) {
  //       // Error; SMS not sent
  //       // ...
  //     });
  // }
  
}
