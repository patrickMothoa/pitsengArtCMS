import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  db = firebase.firestore();
  storage = firebase.storage().ref();
  uid
  
  profile = {
    image: '',
    name: '',
    surname:'',
    phoneNumber:'',
    address: '',
    email: firebase.auth().currentUser.email,
   
    uid: '',
    // phoneNumber: firebase.auth().currentUser.phoneNumber,
  }
  uploadprogress = 0;
  errtext = '';
  isuploading = false;
  isuploaded = false;

  isprofile = false;

  admin = {
    uid: '',
    email:''

    // phoneNumber: '',
  }
  
  constructor(public alertCtrl: AlertController, 
    private router: Router,
    private profileServ: ProfileService) { 
    this.uid = firebase.auth().currentUser.uid;
    
  }
 
  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Got admin', user);
        this.admin.uid = user.uid
        this.admin.email = user.email
      this.getProfile();
      } else {
        console.log('no admin');
        
      }
    })
  }
  async getImage(image){
    let imagetosend = image.item(0);
    if (!imagetosend) {
      const imgalert = await this.alertCtrl.create({
        message: 'Select image to upload',
        buttons: [{
          text: 'Okay',
          role: 'cancel'
        }]
      });
      imgalert.present();
    } else {
      if (imagetosend.type.split('/')[0] !== 'image') {
        const imgalert = await this.alertCtrl.create({
          message: 'Unsupported file type.',
          buttons: [{
            text: 'Okay',
            role: 'cancel'
          }]
        });
        imgalert.present();
        imagetosend = '';
        return;
       } else {
        const upload = this.storage.child(image.item(0).name).put(imagetosend);

        upload.on('state_changed', snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploadprogress = progress;
          this.isuploading = true;
          if (progress==100){
            this.isuploading = false;
          } 
        }, error => {

        }, () => {
          upload.snapshot.ref.getDownloadURL().then(downUrl => {this.ngOnInit
            this.profile.image = downUrl;
            this.uploadprogress = 0;
            this.isuploaded = true;
          });
        });
       }
    }
  }
  createAccount(){
    if (!this.profile.address||!this.profile.name||!this.profile.surname||!this.profile.phoneNumber){
      this.errtext = 'Fields should not be empty'
    } else {
      if (!this.profile.image){
        this.errtext = 'Profile image still uploading or not selected';
      } else {
        this.profile.uid =  this.admin.uid;
        this.db.collection('admins').doc(firebase.auth().currentUser.uid).set(this.profile).then(res => {
          console.log('Profile created');
          this.getProfile();
        }).catch(error => {
          console.log('Error');
        });
      }
    }
  }
  // createAccount(){
    
  //   if (!this.profile.address||!this.profile.name||!this.profile.phoneNumber){
  //     console.log("Are we inside");
  //     this.errtext = 'Fields should not be empty'
  //     if (!this.profile.image){
  //       this.errtext = 'Profile image still uploading or not selected';
  //       this.profile.uid =  this.admin.uid;
  //       this.db.collection('admins').doc(firebase.auth().currentUser.uid).set(this.profile).then(res => 
  //         {
  //         console.log('Profile created');
  //         this.getProfile();
  //       }).catch(error => {
  //         console.log('Error');
  //       });
        
  //     } else {
  //       this.errtext = 'image not uploaded'
  //     }
  //   }
  //   else {
     
  //   }
  // }


  getProfile(){
    this.db.collection('admins').where('uid', '==', this.admin.uid).get().then(snapshot => {
      if (snapshot.empty) {
        this.isprofile = false;
      } else {
        this.isprofile = true;
        snapshot.forEach(doc => {
          this.profile.address = doc.data().address;
          this.profile.image= doc.data().image
          this.profile.name=doc.data().name
          this.profile.surname=doc.data().surname
          this.profile.phoneNumber=doc.data().phoneNumber
          this.profile.email=doc.data().email
          
          
        })
      }
    })
  }
  edit() {
    this.isprofile = false;
  }
  openpro(){
    this.router.navigateByUrl('/pro');
  }
  openInvoice(){
    this.router.navigateByUrl('/user-invoices');
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

  


