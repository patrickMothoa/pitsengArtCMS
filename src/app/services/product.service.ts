import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  db = firebase.firestore();
  firestore
   data = {}
  event = {
    image: '',
    categories:'',
    name:'',
    price:null,
    productno:'',
    desc: null,
    items:'',
    small:'',
    medium:'',
    large: ''
  };

  Deco = []
  Vase = []

  Detail = {
    image : "",
    imageSide:"",
    imageBack:"",
    imageTop:"",
    quantity:"",
    price : "",
    name : "",
    desc : "",
    size : "",
    items : "",
    category : "",
    key : "",
    productCode:""
  }

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }
​
/// adding
  async addProduct(event) {
    const loading = await this.loadingCtrl.create({
      message: 'Adding product'
    });
    loading.present();
    this.db.collection('Products').doc().set(event).then(async res => {
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
      this.db.collection('Products').get().then(snapshot => {
        const Products = [];
        snapshot.forEach(doc => {
          Products.push(doc.data());
          console.log("herererer", Products);
        });
        return Products;
        
      });

    }

  //////updating
  updateProduct(event) {
    const productUpdate = this.db.collection('Products').doc();
    return productUpdate.update(event)
.then(() => {
    console.log('Document successfully updated!');
})
.catch(error => {
    console.error('Error updating document: ', error);
});
}
deleteSpecialsItem(event, id){
  return firebase.firestore().collection('Sales').doc(id).delete().then(result => {
    firebase.firestore().collection('Products').doc(event.brand).collection(event.category).doc(event.id).update({
      onSale : false,
      discount : 0,
      totalPrice : Number(event.data.price)
    })
    return result
  }).catch(error => {
    return 'Not deleted'
  })
}



}
