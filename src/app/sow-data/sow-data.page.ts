import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sow-data',
  templateUrl: './sow-data.page.html',
  styleUrls: ['./sow-data.page.scss'],
})
export class SowDataPage implements OnInit {

db = firebase.firestore();
  a = []
  conArray =[]
  Orders =[]
  constructor(public DataService : DataService, public modalController: ModalController) { }

  ngOnInit() {
    this.Orders = this.DataService.myArray;
      console.log("Data in the Service ====   ", this.Orders);
 }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  ionViewWillEnter(){
   
  }

}
