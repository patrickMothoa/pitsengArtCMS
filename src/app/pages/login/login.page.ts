import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'services/auth.service';
import * as firebase from 'firebase'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
declare var window

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {


  phoneNumber
  password
  registrationForm
  smsSent
  confirmationResult = ''
  inputCode
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier
  constructor(  
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public route :Router,
    ) {
      this.smsSent = false

      firebase.auth().languageCode = 'en';

  this.registrationForm = formBuilder.group({
    phoneNumber: [this.phoneNumber, Validators.compose([Validators.required])]
  })

  }
 
  requestCode(){
    this.phoneNumber = this.registrationForm.get('phoneNumber').value
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier
    return this.authService.requestLogin(this.phoneNumber, appVerifier).then(result => {
      if(result.success === true){
        console.log(result);
        this.confirmationResult = result.result
        console.log(this.confirmationResult);
        //this.presentAlert();
      }
    })
  }
  login(code){
    if(this.confirmationResult !== ''){
      //var code = this.inputCode
      return this.authService.login(code, this.confirmationResult).then(result => {
        console.log(result);
      })
    }
    this.route.navigateByUrl('/home')

  }
​
  addUser(){
    this.phoneNumber = this.registrationForm.get('phoneNumber').value
    console.log(this.phoneNumber);
    // let recaptchaParameters: {
    //   type: 'image', // another option is 'audio'
    //   size: 'invisible', // other options are 'normal' or 'compact'
    //   badge: 'bottomleft' // 'bottomright' or 'inline' applies to invisible.
    // }
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('yeah yeah yeah');
      },
      'expired-callback': function() {
        
      }
    });
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier
    return this.authService.requestLogin(this.phoneNumber, appVerifier).then(result => {
      if(result.success === true){
        console.log(result);
        this.confirmationResult = result.result
        console.log(this.confirmationResult);
        this.alert()
      }
    })
    // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptchaParameters, result => {
    //   console.log(result);
​
    // })
      
    
  }
  async alert(){
    const alert = await this.alertController.create({
      header: 'Verfification code',
      subHeader: 'Enter verification code',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Enter code'
        }],
      buttons: [{
        text: 'Submit',
        role: 'submit',
        cssClass: 'secondary',
        handler: (result) => {
          console.log(result.code);
          this.login(result.code)
        }
      }]
    });
​
    await alert.present();
  }
​
​
}