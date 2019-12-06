import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'services/auth.service';
import * as firebase from 'firebase'
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
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
                            this.router.navigateByUrl('/profile')
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
  }
  forgotpassword(email) {
    firebase.auth().sendPasswordResetEmail(email).then(res => {
      console.log(res);
    });
  }
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

//   phoneNumber = ''
//   password
//   registrationForm
//   smsSent
//   confirmationResult = ''
//   inputCode
//   public recaptchaVerifier: firebase.auth.RecaptchaVerifier
//   db=firebase.firestore()
//   constructor(  
//     public authService: AuthService,
//     public formBuilder: FormBuilder,
//     public alertController: AlertController,
//     public route :Router,
//     private profileService: ProfileService
//     ) {
//       this.smsSent = false

//       firebase.auth().languageCode = 'en';

//   this.registrationForm = formBuilder.group({
//     phoneNumber: [this.phoneNumber, Validators.compose([Validators.required])]
//   })

//   }
//   ngOnInit() {
//     // firebase.auth().onAuthStateChanged(res => {
//     //   if (res) {
//     //     this.profileService.storeAdmin(res);
//     //     this.route.navigateByUrl('home', { skipLocationChange: true });
//     //   }
//     // });
//   }
 
//   requestCode(){
//     this.phoneNumber = this.registrationForm.get('phoneNumber').value
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
//     console.log(window.recaptchaVerifier);
//     let appVerifier = window.recaptchaVerifier
//     return this.authService.requestLogin(this.phoneNumber, appVerifier).then(result => {
//       if(result.success === true){
//         console.log(result);
//         this.confirmationResult = result.result
//         console.log(this.confirmationResult);
//       }
//     })
//   }
//   logins(code){
//     if(this.confirmationResult !== ''){
//       return this.authService.login(code, this.confirmationResult).then(result => {
//         console.log(result);
//       })
//     }
//   }
// ​
//   addUser(){
//     this.phoneNumber = this.registrationForm.get('phoneNumber').value
//     console.log(this.phoneNumber);
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
//       size: 'invisible',
//       callback: (response) => {
//         console.log('checking here');
//       },
//       'expired-callback': () => {
        
//       }
//     });
//     console.log(window.recaptchaVerifier);
//     let appVerifier = window.recaptchaVerifier
//     return this.authService.requestLogin(this.phoneNumber, appVerifier).then(result => {
//       if(result.success === true){
//         console.log(result);
//         this.confirmationResult = result.result
//         console.log(this.confirmationResult);
      
//        this.alert();
      
//       }
//     })
//   }

//   async alert(){
//     const alert = await this.alertController.create({
//       header: 'Verfification code',
//       // subHeader: 'Enter verification code',
//       inputs: [
//         {
//           name: 'code',
//           type: 'text',
//           placeholder: 'Enter code'
//         }],
//       buttons: [{
//         text: 'Submit',
//         role: 'submit',
//         cssClass: 'secondary',
//         handler: (result) => {
//           console.log(result.code);
//           this.logins(result.code);
//           this.db.collection('admins').doc(firebase.auth().currentUser.uid).get().then(res =>{
//             if (res.exists){
//               this.route.navigateByUrl('/home')
             
//             }else{
//               this.route.navigateByUrl('/profile')
//             }
//           })
//         }
//       }]
//     });
//     await alert.present();
//   }

//   login(){
//     this.phoneNumber = this.registrationForm.get('phoneNumber').value
//         console.log(this.phoneNumber)
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
//     console.log(window.recaptchaVerifier);
//     let appVerifier = window.recaptchaVerifier

//     firebase.auth().signInWithPhoneNumber(String(this.phoneNumber), appVerifier).then(confirmationResult => {
//       window.confirmationResult = confirmationResult;
//       // this.db.collection('admins').doc(firebase.auth().currentUser.uid).get().then(res =>{
//       //   if (res.exists){
//       //     this.route.navigateByUrl('/home')
         
//       //   }else{
//       //     this.route.navigateByUrl('/profile')
//       //   }
//       // })
//     //   console.log(confirmationResult.user.uid,confirmationResult.user.email,'user logged in');
//     //   // this.slist.email = result.user.email;
//     //   // console.log(this.lsname)
//     //   if(confirmationResult.user.uid >"")
//     //   {
//     // //     const toast =  this.toastCtrl.create({
//     // //       message: 'Login Successful!',
//     // //       duration: 9000
//     // //     });
//     // // toast.present();
//     //   ​this.route.navigateByUrl('/home')
//     //   }
   
      
//     }).catch((error) => {
//       console.log(error)
//     });
//   }
// ​
// ​
}