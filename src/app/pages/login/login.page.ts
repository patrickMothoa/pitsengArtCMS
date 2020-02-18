import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'services/auth.service';
import * as firebase from 'firebase'
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ResetPasswordPage } from '../reset-password/reset-password.page';
import Swal from 'sweetalert2';
import { ProfilePage } from '../profile/profile.page';

declare var window

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  db = firebase.firestore();
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;
  storage = firebase.storage().ref();
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    public modalController:ModalController,
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }
  email="";
  message: any = "";
  loader: boolean = true;
  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(res => {
      if (res) {
        this.profileService.storeAdmin(res);
        // this.router.navigateByUrl('home', { skipLocationChange: true });
      }
    });
  }
  async loginAdmin(loginForm): Promise<void> {

      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

      firebase.auth().signInWithEmailAndPassword(loginForm.email, loginForm.password).then(user => {
          this.loading.dismiss().then(res => {
            this.profileService.storeAdmin(res);
            this.db.collection('admins').doc(firebase.auth().currentUser.uid).get().then(res =>{
                          if (res.exists){
                            this.router.navigateByUrl('/pro')
                           
                          }else{
                           this.createProfile()
                          }
                        })
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
          });
        }
      );
      this.loader
  }
  forgotpassword(email) {
    firebase.auth().sendPasswordResetEmail(email).then(res => {
      console.log(res);
    });
  }
  async resetPassword(){
    let modal = await this.modalController.create({
      component : ResetPasswordPage,
      cssClass: 'resetModal'
    })
    
    return await modal.present();
   }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  async createProfile() {
    const modal = await this.modalController.create({
      component:ProfilePage,
      cssClass: 'profile',
      
    
    });
    return await modal.present();
  }
  // alertPassword(){
  //   var auth = firebase.auth();
  //   console.log("email sent")
  //   Swal.fire({
  //     title: 'Submit your Github username',
  //     input: 'text',
  //     inputAttributes: {
  //       autocapitalize: 'off'
  //     },
  //     showCancelButton: true,
  //     confirmButtonText: 'Look up',
  //     showLoaderOnConfirm: true,
      
  //     preConfirm: () => {
  //       return auth.sendPasswordResetEmail(this.email)

  //         // .then(response => {
  //         //   if (!response.ok) {
  //         //     throw new Error(response.statusText)
  //         //   }
  //         //   return response.json()
  //         // })
  //         // .catch(error => {
  //         //   Swal.showValidationMessage(
  //         //     `Request failed: ${error}`
  //         //   )
  //         // })
  //     },
  //     allowOutsideClick: () => !Swal.isLoading()
      
  //   })  .catch((error) => {
  //     this.message = error.message;
  //   })
  // }
async  register() {
    const alert = await this.alertCtrl.create({
      header: 'Enter your email',
      message: 'We need to your email to send the password reset link.',
      inputs: [
        {
          name: 'adminemail',
          type: 'email',
          placeholder: 'your@example.com'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('Admin Cancelled');
          }
        },
        {
          text: 'Reset',
          cssClass: 'primary',
          handler: async data => {
            const loading = await this.loadingCtrl.create({
              message: 'Working',
              spinner: 'bubbles'
            });
            loading.present();
            console.log('Admin Sent Email ', data.adminemail, 'and url is ', window.location.href);
            const actionCodeSettings = {
              url: 'window.location.href',
              // When multiple custom dynamic link domains are defined, specify which
              // one to use.
              dynamicLinkDomain: 'hotel-cms-d3e5c.firebaseapp.com'
            };
            firebase.auth().sendPasswordResetEmail(data.adminemail)
              .then( async res => {
                loading.dismiss();
                const response = await this.alertCtrl.create({
                  message: 'Verification email sent',
                  buttons: [{
                    text: 'Okay',
                    role: 'cancel'
                  }]
                });
                response.present();
                loading.dismiss();
              })
              .catch( async error => {
                loading.dismiss();
                const response = await this.alertCtrl.create({
                  message: 'Error sending email. Please try again later.',
                  buttons: [{
                    text: 'Okay',
                    role: 'cancel'
                  }]
                });
                response.present();
              });
          }
        }

      ]
    });
    alert.present();
  }
  goToRegister(){
    this.router.navigate(['register']);
  }
  googleSignin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().getRedirectResult().then( (result) => {
      if (!result.user) {
        
        firebase.auth().signInWithRedirect(provider);
      } else {
        this.router.navigateByUrl('home');
        
      }
  }).catch(function (error) {
    console.log(error)
    // ...
  });
    
  }
  


}