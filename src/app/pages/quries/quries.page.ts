import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-quries',
  templateUrl: './quries.page.html',
  styleUrls: ['./quries.page.scss'],
})
export class QuriesPage implements OnInit {
  db = firebase.firestore();
  message = [];
  constructor() { }

  ngOnInit() {
    this.getMessage()
  }
  
  getMessage(){
   
    this.db.collection('Messages').get().then(snapshot => {
      this.message = [];
        
        snapshot.forEach(doc => {
          this.message.push(doc.data());
        });
    })
      
  }
}


