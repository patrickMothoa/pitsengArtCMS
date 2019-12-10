import { Component, OnInit } from '@angular/core';
import {} from '../user-invoices/user-invoices.page'
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
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
