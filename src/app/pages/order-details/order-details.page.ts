import { Component, OnInit, Input } from '@angular/core';
import {} from '../user-invoices/user-invoices.page'
import { Router, RouterLinkActive, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { DataService } from 'src/app/services/data.service';

 
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform, NavParams, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  loader: boolean = true;

  @Input() id: any;

  Data = [];

  letterObj = {
    to: '',
    from: '',
    text: '' 
  };

  checkpdf = 'yeah im working';
  dbUser = firebase.firestore().collection('UserProfile');
  dbProfile = firebase.firestore().collection('admins');
  dbOrder = firebase.firestore().collection('Order');
  dbHistory = firebase.firestore().collection('orderHistory');
  uid = firebase.auth().currentUser.uid;
  profile = {
    image: '',
    name: '',
    phoneNumber:'',
    address: '',
    surname:'',
    email: '',
    uid: '',
    // phoneNumber: firebase.auth().currentUser.phoneNumber,
  }
 
  pdfObj = null;
  text : boolean = false;
  hideButton : boolean = false;

  db = firebase.firestore();
  a = []
  public item =[];
  conArray =[]
  Orders =[]
  myArray = []
  key: any;
  pdfLink :any;
  date :any;
  
  status :any;
  docID;
  ref;
  name;
  amount;
  quantity;
  image;
  arr;
  price;
  totalPrice;
  active: any;
  Allorders = [];
  ////////////////
  orderShowbtn : boolean = false;
  readyBtn : boolean =  false;
  ///////////////
  trackOrders =  {
    product_name: '',
    size: '',
    quantity: 0,
    total: 0,
    image: '',
    productCode: '',
    desc: '',
    amount:'',
    status:'',
    
  }
  myHistory = [];
  pageName = '';
  historyStatus = '';
  constructor(public dataservice : DataService,public modalController: ModalController,private router: Router, public route: ActivatedRoute,public DataService : DataService, private file: File, private fileOpener: FileOpener, private plt: Platform) {
    this.ref = `${this.ref}`
    this.name = `${this.name}`;
    this.pageName = `${this.pageName}`
    // this.amount = `${this.amount}`;
    // this.quantity = `${this.quantity}`;
    // this.image=`${this.image}`;
    this.arr = `${this.arr}`;
    // this.price = `${this.price}`;
    // this.totalPrice = `${this.totalPrice}`;
    // this.status = `${this.status}`;
   }
   ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    

  }

  //  showMovementReport() {
  //   if(this.toggled){
  //        this.buttonColor = '#345465';
  //        this.toggled = false;
  //   }
  //   else{
  //        this.buttonColor = '#ffffff'; //hex code for previous color
  //        this.toggled = true;
  //   }
  //     }

  
// orderCancelled(){
//   this.orderStatus = 0
// }

/////////////////////////////////////////////////////
receivedOrder(){
  // this.orderShowbtn  = !false;
  // this.orderHidebtn  = false;
 }
  
  ChangeText(){
    this.text = !false;
    this.hideButton=true;
  }

  getProduct(key) { 
    // console.log('my key ', key);
   this.dbOrder.doc(key).onSnapshot((res)=>{
     this.status = res.data().status;
     this.totalPrice = res.data().totalPrice;
   })
  }

  ngOnInit() {
    //console.log('bla =>',this.pageName);
    // console.log("My array ", this.arr);
  /*   this.arr.forEach((i)=>{
      console.log('My info ', i);
    }) */
    if (this.pageName==='history') {
      this.getOrderHistory();
    } else {
      this.getProduct(this.ref);
    }
    // console.log(`${this.ref} ${this.name}`)
    this.getProfile(); 
    
    
    // this.orderProcessed();
    // this.orderReady();
    // this.cancel()
  setTimeout(() => {
    this.showList(0, this.arr[0]);
  }, 1000);
    // console.log("my ref",this.ref);
    
    //   this.processOrder();
    //   this.orderPrepared()
    //   this.orderReady();
    //   this.orderCollect()
    // this.dismiss();
  }
  getOrderHistory() {
     this.dbHistory.doc(this.ref).onSnapshot((res)=>{
       this.historyStatus = res.data().status;
    }) 
  }
  showList(i, p) {
    this.active = i;

    console.log('year', p);

    if(this.pageName==='history') {
      this.trackOrders.product_name = p.product_name;
      this.trackOrders.quantity = p.quantity;
      this.trackOrders.size = p.size;
      this.trackOrders.total = p.total;
      this.trackOrders.image = p.image;
      this.trackOrders.productCode = p.productCode;
      this.trackOrders.desc = p.desc;
      this.trackOrders.amount =p.amount;
      this.trackOrders.status =p.status;
    } else {
         this.trackOrders.product_name = p.obj.product_name;
    this.trackOrders.quantity = p.obj.quantity;
    this.trackOrders.size = p.obj.size;
    this.trackOrders.total = p.obj.total;
    this.trackOrders.image = p.obj.image;
    this.trackOrders.productCode = p.obj.productCode;
    this.trackOrders.desc = p.obj.desc;
    this.trackOrders.amount =p.obj.amount;
    this.trackOrders.status =p.obj.status;
    }
 

    // this.selectedValueIndex = p
  }
  
  ionViewDidLeave() {
    console.log('this page is not active');
    
    this.Orders = [];
  }
  ionViewDidEnter(){
   
  }
  getProfile() {
    this.dbProfile.doc(this.uid).onSnapshot((res)=>{
    this.profile.name = res.data().name;
    this.profile.surname = res.data().surname;
    this.profile.phoneNumber = res.data().phoneNumber;
    this.profile.address = res.data().address;
    })
  }
  items: any;
  // date: any;
  orderNumber :any;
  goToPDF(){
    let name = [];
    let quantity = [];
    let cost = [];
    let items = this.arr.map((item) => {
      //console.log('Extras in table...', item);
      if (this.arr.length >= 0) {

        return [item.product_name, item.quantity, 'R' + item.cost + '.00'];
      } else {
        return ['*********', 0, 'R0.00']
      }
    });
    this.arr.forEach((item) => {
      name.push(item.product_name);
      cost.push(item.cost);
      quantity.push(item.quantity)
    })
    var docDefinition = {
      content: [
        { text: 'Pitseng Arts and Crafts', style: 'header', color: "gray", bold: true, alignment: "left", fontFamily: 'Roboto', },
        {
          image:
            'data:image/jpeg;base64,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',
          fit: [100, 100], alignment: "right", marginBottom: 70,
        },
        // { text: new Date().toTimeString(), alignment: 'right' },

        { text: 'From', style: 'subheader', color: "gray", bold: true, alignment: "left", fontFamily: 'Roboto', },
        { text: this.letterObj.from, color: "gray", italic: true, alignment: "left", fontFamily: 'Roboto', fontSize: 11, },

        { text: 'To', style: 'subheader', color: "gray", italic: true },
        { text: this.letterObj.to, color: "gray", italic: true, alignment: "left", fontFamily: 'Roboto', fontSize: 11, },

        // { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
        { text: 'Reference number: ', style: 'subheader', color: "gray", italic: true },
        { text: this.ref, color: "gray", italic: true },


        { text: 'Date Of Purchase: ', style: 'subheader', color: "gray", bold: true, alignment: "left", fontFamily: 'Roboto', fontSize: 13, },
        { text: '20 December 2019 ', style: 'subheader', color: "gray", bold: true, alignment: "left", fontFamily: 'Roboto', fontSize: 12, },

        {

          layout: 'headerLineOnly',
          table: {

            widths: ['auto', 'auto', '20%'],

            body: [


              [name, quantity, cost,],
              [{ text: this.status, color: 'gray' }, '', { text: '100', color: 'gray', Border: false }],
              [{ text: 'TOTAL', bold: true, color: 'gray', lineHeight: 2, marginTop: 10, },
              { text: 'R', bold: true, color: 'gray', lineHeight: 2, marginTop: 10 },
              { text: 1000, bold: true, color: 'gray', lineHeight: 2, marginTop: 10 },]
            ]
          }

        },


        { text: 'Order Type: Delivery', style: 'story', margin: [5, 2], color: "gray", italic: true, alignment: "left", fontFamily: 'Roboto', fontSize: 11, },

        { text: 'Order Address: ', style: 'story', margin: [5, 2], color: "gray", italic: true, alignment: "left", fontFamily: 'Roboto', fontSize: 11, },
        { text: '125 Street', style: 'story', margin: [5, 2], color: "gray", italic: true, alignment: "left", fontFamily: 'Roboto', fontSize: 10, },


        { text: 'Order Status: Delivered', style: 'story', margin: [5, 2], color: "gray", italic: true, alignment: "left", fontFamily: 'Roboto', fontSize: 13, },
      ],


      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
          lineHeight: 1.5,
        },
      },

      pageSize: 'A4',
      pageOrientation: 'portrait'

    };
    this.pdfObj = pdfMake.createPdf(docDefinition);
    console.log("End of pdf make ", this.pdfObj);
    this.downloadUrl();
  }
  downloadUrl() {
    this.pdfObj.getBuffer((buffer) => {
      var blob = new Blob([buffer], { type: 'application/pdf' });
      let date = Date();
      this.orderNumber=this.key
      let user = firebase.auth().currentUser.email;
      let num = 'Reciept' + Math.floor(Math.random() * 10000000)
      // Save the PDF to the data Directory of our App
      firebase.storage().ref('Receipt/').child(num + '.pdf').put(blob).then((results) => {
        console.log('results url: ', results);
        // results.downloadURL
        firebase.storage().ref('Receipt/').child(results.metadata.name).getDownloadURL().then((url) => {
          // console.log(results);
         // this.pdfDoc = url;
           this.pdfLink = url;
           this.saveData();
          //  this.saveData();
          console.log('pdf link from storage............:', this.pdfLink);
        })
      })
      // this.file.writeFile(this.file.dataDirectory, 'receipt.pdf', blob, { replace: true }).then(fileEntry => {
      // this.fileOpener.open(this.file.dataDirectory + 'receipt.pdf', 'application/pdf');
      // })
    });
    // this.navCtrl.setRoot(SuccessPage);
    this.pdfObj.download();
  }

  // orderStatus;

  saveData() {
   console.log("Your key ", this.ref);
   this.dbHistory.doc(this.ref).update({
      pdfLink : this.pdfLink })
  
  }
  dismiss(){
    this.modalController.dismiss({
      'dismissed':true
    });
  }
  processOrder(msg){
 console.log("Your key ",this.ref);
 this.dbOrder.doc(this.ref).update({
  status : msg })
  // console.log("My status is ", msg);
 }
 orderIsReady(msg) { 
 
  console.log("Your key ",this.ref);
 
this.dbOrder.doc(this.ref).update({
  status : msg })
  

}
closeOrder(msg) {
  this.getProduct(this.ref);
  // this.downloadUrl();
  let prod = [];
  this.arr.forEach((i)=>{
    prod.push(i.obj)
  }) 
  // console.log("My name ",this.name);
 this.dbOrder.doc(this.ref).update({
  status : msg }).then(()=>{
   this.dbHistory.doc(this.ref).set({
    // reciept: this.pdfLink,
    date: new Date().getTime(),
    product: prod,
    userID: prod[0].customerUid,
    status: msg,
    totalPrice: this.totalPrice
  //  name: this.name
   }).then(()=>{
     this.dbOrder.doc(this.ref).delete();
   })
  })
}

cancelOrder(msg){
  
 // console.log("Your key ",this.ref);
  
  this.dbOrder.doc(this.ref).update({
   status : msg })

   
}

orderCollect() {
  this.dbOrder.doc(this.ref).onSnapshot((res) => {
    console.log("My status", res.data().status);
    
    if (res.data().status === 'delivered' || res.data().status === 'cancelled') {
      //console.log('Collect');
      this.dbHistory.doc(this.ref).set({ date: new Date().getTime(), reciept: null }).then(() => {
        // this.dbOrder.doc(this.ref).delete();
      })
    } else {
      console.log('collection',status);
    }
  })
}
GetOrders(){
  firebase.firestore().collection('Order').onSnapshot((data)=>{
          console.log("checking my data", data);
          this.Allorders = [];
            data.forEach((item)=>{
              this.Allorders.push({ref:item.id,info:item.data(), total:item.data()})
            })
            console.log("ccc", this.Allorders);

      }) 
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
  // from old code
  // { text: '', style: 'subheader'},
  // this.profile.address,
  // this.profile.phoneNumber,

  // style: 'invoice',

  // layout: 'headerLineOnly',
  // table: {
  //     widths: ['*', 75, 75, 75],
  //     body: [
  //         [
  //             '',
  //             'Invoice No:',
  //              this.key,
  //         ],
  //         [
  //             '',
  //             'Invoice Date:',
  //              this.date,
  //         ],
  //         // [
  //         //     '',
  //         //     'Invoice Name:',
  //         //     // this.order.name,
  //         // ]
  //     ]
  // },
  // layout: 'noBorders'

  // { text: '', style: 'subheader' },
  //         { text: this.letterObj.from },
  // ​
  //         { text: '', style: 'subheader' },
  //         this.letterObj.to,
  // ​ {
  //   style: 'itemsTable',
  //   table: {
  //       widths: ['*', 75, 75, 75 ],
  //       body: [
  //           [ 
  //               { text: 'Name', style: 'itemsTableHeader' },
  //               { text: 'Quantity', style: 'itemsTableHeader' },
  //               { text: 'Price', style: 'itemsTableHeader' },
  //              { text: 'Amount', style: 'itemsTableHeader' },
  //           ],
  
  //           // this.Data
            
  //       ].concat(this.items)
  //       // .concat(items)
  //   }
  // },
  
  // {
  //   style: 'totalsTable',
  //   table: {
  //       widths: ['*', 75, 75],
  //       body: [
  //           [
  //               '',
  //               'Subtotal',
  //               this.totalPrice
  //           ],
            
  //           [
  //               '',
  //               'Total',
  //                 this.totalPrice
  //           ]
  //       ]
  //   },
  //   layout: 'noBorders'
  // },
}