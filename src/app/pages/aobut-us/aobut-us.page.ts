import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2'
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
    MyImage :''
  }
  services ={
    service: '',
    job: '',
    history:'', 
    MyImage :''
  }
  
  constructor(public toastCtrl: ToastController) { }

  ngOnInit() {

    firebase.firestore().collection("AboutUs").onSnapshot(data => {
      data.forEach(data => {
        if(data.data().customerUid === firebase.auth().currentUser.uid){

        this.about.MyImage = data.data().image;
        this.about.fullname = data.data().name;
        this.about.subject = data.data().subject;
        this.about.textMessage = data.data().message;

        }
        
      })
    })



    firebase.firestore().collection("Service").onSnapshot(data => {
      data.forEach(data => {
        if(data.data().customerUid === firebase.auth().currentUser.uid){

          this.services.MyImage = data.data().image;
          this.services.service = data.data().service;
          this.services.history = data.data().history;
          this.services.job = data.data().job;

        }
        
      })
    })


 

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
        this.about.MyImage = dwnURL;
      });
    });


  }


  addAboutUs() {
    if(firebase.auth().currentUser){
     let Uid = firebase.auth().currentUser.uid;
     this.dbAboutUs.doc(Uid).set({
       customerUid: Uid,
       name : this.about.fullname,
       subject : this.about.subject,
       message : this.about.textMessage,
       image :this.about.MyImage
  
       
      })
     
      .then(() => {
        this.saveAlert()
        // this.toastController('information saved !')
     }).catch(err => {
              console.error('error',err);
     });

  //    this.about = {
  //     fullname: '',
  //     subject: '',
  //     textMessage:'',
  //     image :''
  //  }


    }else{
      //this.createModalLogin();
    }
  }


  serviceImage(event): void {
    console.log("Method called");
    

    const i = event.target.files[0];
    console.log(i);
    const upload = this.storage.child(i.name).put(i);
    upload.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('upload is: ', progress , '% done.');
    }, err => {
    }, () => {
      upload.snapshot.ref.getDownloadURL().then(dwnURL => {
        
        this.services.MyImage = dwnURL;
        console.log('File avail at: ', this.services.MyImage);
      });
    });

  }


  addServices() {
    if(firebase.auth().currentUser){
     let Uid = firebase.auth().currentUser.uid;
     this.dbService.doc(Uid).set({
       customerUid: Uid,
       service : this.services.service,
       job : this.services.job,
       history : this.services.history,
       image :this.services.MyImage
  
       
      }).then(() => {
        this.saveAlert()
        // this.toastController('information saved !')
     }).catch(err => {
              console.error(err);
     });

  //    this.services = {
  //     service: '',
  //     job: '',
  //     history:'',
  //     image :''
  //  }

    }else{
      //this.createModalLogin();
    }
  }
  async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
}

saveAlert(){
  // Swal.fire(
    
  //   'your about us content is updated',
  //   'You clicked the button!',
  //   'success',
    
  // )

  Swal.fire({
    title: 'About us content updated.',
    showClass: {
      popup: 'animated fadeInDown faster'
    },
    hideClass: {
      popup: 'animated fadeOutUp faster'
    },
    icon:'success'
  })
    
}
}