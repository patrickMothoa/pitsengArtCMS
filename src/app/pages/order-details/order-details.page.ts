import { Component, OnInit } from '@angular/core';
import {} from '../user-invoices/user-invoices.page'
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  db = firebase.firestore();
  a = []
  conArray =[]
  Orders =[]
  myArray = []
  constructor(private router: Router,public DataService : DataService) { }

  ngOnInit() {
    // this.Orders = this.DataService.myArray;
    // console.log("Data in the Service ====   ", this.Orders);
  }
  ionViewDidEnter(){
    this.Orders = this.DataService.myArray;
    console.log("Data in the Service ====   ", this.Orders);
   
  }
  // viewDetails(uid){
  //   this.db.collection("Users").doc(uid).collection("Orders").onSnapshot(data => {
  //     this.Orders =this.DataService.myArray = []
  //       data.forEach(item => {
  //         console.log("Your data is here ", item.data());        
  //         this.DataService.myArray.push(item.data())
  //       })
  //     })
  //     this.DataService.myArray.forEach(i => {
  //       console.log("data from the service ", i);
  //     })
  //   this.router.navigateByUrl('/order-details');
  // }

  openPro(){
    this.router.navigateByUrl('/pro');
  }
  openProfile(){
    this.router.navigateByUrl('/profile');
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
