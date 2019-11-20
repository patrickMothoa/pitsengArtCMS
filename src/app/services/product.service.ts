import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  db = firebase.firestore();

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }
​
/// adding
  async addProduct(event) {
    const loading = await this.loadingCtrl.create({
      message: 'Adding product'
    });
    loading.present();
    this.db.collection('Categories').doc(event.name).set(event).then(async res => {
        console.log('product add Response', res);
        loading.dismiss();
        location.reload();
        const alert = await this.alertCtrl.create({
          message: 'product added'
        });
        alert.present();
      }).catch(async err => {
        loading.dismiss();
        const alert = await this.alertCtrl.create({
          message: 'Error adding product'
        });
        alert.present();
      });
    }

    // retriving from firebase.firestore
    getProductList() {
      this.db.collection('Categories').get().then(snapshot => {
        const products = [];
        snapshot.forEach(doc => {
          products.push(doc.data());
        });
        return products;
      });
    }

  //////updating
  updateProduct(event) {
    const roomUpdate = this.db.collection('Categories').doc(event.name);
    return roomUpdate.update(event)
.then(() => {
    console.log('Document successfully updated!');
})
.catch(error => {
    console.error('Error updating document: ', error);
});
}

}
