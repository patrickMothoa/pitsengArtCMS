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
  myProduct = false;
  active: any;

  // userMessage ={


  // }
  constructor() { }

  ngOnInit() {
    this.getMessage()
    setTimeout(() => {
      this.showList(0);
      console.log('index',  )
    }, 1000);
  }
  
  getMessage(){
   
    this.db.collection('Messages').get().then(snapshot => {
      console.log('messges', this.message);
      
      if( this.message = []){
snapshot.forEach(doc => {
          this.message.push(doc.data());
          console.log('messges', doc.data());
        });
        this.myProduct = true
      }else{
        this.myProduct = false
      }
     
        
        
    })
      
  }
  showList(i) {
    this.active = i;
    
    
    console.log('year',this. message);
  
  
  
  
    // this.selectedValueIndex = p
  }
}


