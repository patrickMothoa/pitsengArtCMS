import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-aobut-us',
  templateUrl: './aobut-us.page.html',
  styleUrls: ['./aobut-us.page.scss'],
})
export class AobutUsPage implements OnInit {
  dbAboutUs = firebase.firestore().collection('AboutUs');
  dbService = firebase.firestore().collection('Service');
  storage = firebase.storage().ref();
  about = {
    fullname: '',
    subject: '',
    textMessage: '',
    image :''
  }
  services ={
    service: '',
    job: '',
    history:'', 
    image :''
  }
  
  constructor() { }

  ngOnInit() {
  }
  changeListener(event): void {
    const i = event.target.files[0];
    console.log(i);
    const upload = this.storage.child(i.name).put(i);
    upload.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('upload is: ', progress , '% done.');
    }, err => {
    }, () => {
      upload.snapshot.ref.getDownloadURL().then(dwnURL => {
        console.log('File avail at: ', dwnURL);
        this.about.image = dwnURL;
      });
    });
  }
  addAboutUs() {
    if(firebase.auth().currentUser){
     let Uid = firebase.auth().currentUser.uid;
     this.dbAboutUs.add({
       customerUid: Uid,
       name : this.about.fullname,
       subject : this.about.subject,
       message : this.about.textMessage,
       image :this.about.image
  
       
      }).then(() => {
     
     }).catch(err => {
              console.error(err);
     });

     this.about = {
      fullname: '',
      subject: '',
      textMessage:'',
      image :''
   }


    }else{
      //this.createModalLogin();
    }
  }
  serviceImage(event): void {
    const i = event.target.files[0];
    console.log(i);
    const upload = this.storage.child(i.name).put(i);
    upload.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('upload is: ', progress , '% done.');
    }, err => {
    }, () => {
      upload.snapshot.ref.getDownloadURL().then(dwnURL => {
        console.log('File avail at: ', dwnURL);
        this.services.image = dwnURL;
      });
    });
  }
  addServices() {
    if(firebase.auth().currentUser){
     let Uid = firebase.auth().currentUser.uid;
     this.dbService.add({
       customerUid: Uid,
       service : this.services.service,
       job : this.services.job,
       history : this.services.history,
       image :this.services.image
  
       
      }).then(() => {
     
     }).catch(err => {
              console.error(err);
     });

     this.services = {
      service: '',
      job: '',
      history:'',
      image :''
   }

    }else{
      //this.createModalLogin();
    }
  }


    
}
