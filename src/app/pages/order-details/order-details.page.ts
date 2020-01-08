import { Component, OnInit } from '@angular/core';
import {} from '../user-invoices/user-invoices.page'
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { DataService } from 'src/app/services/data.service';

 
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
dbAdmin = firebase.firestore();

profile={
  name: '',
  address: '',
  phoneNumber: ''
}
  letterObj = {
    to: '',
    from: '',
    text: ''
  }
 
  pdfObj = null;
  text : boolean = false;
  pdf : boolean =false;

  
  db = firebase.firestore();
  a = []
  conArray =[]
  Orders =[]
  myArray = []
  constructor(private router: Router,public DataService : DataService, private file: File, private fileOpener: FileOpener, private plt: Platform) { }

  ChangeText(){
    this.text = !false
    // document.getElementById("text").innerHTML = "Send Recept";
    // this.router.navigateByUrl('/pdf');
  }

  ngOnInit() {
    // this.Orders = this.DataService.myArray;
    // console.log("Data in the Service ====   ", this.Orders);
  }
  ionViewDidEnter(){
    this.Orders = this.DataService.myArray;
    console.log("Data in the Service ====   ", this.Orders);
   
  }
  goToPDF(){
    // this.router.navigateByUrl('/pdf');
    var docDefinition = {
      content: [
        { text: 'Pitseng Arts and Crafts', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'Soweto Empowerment Zone 42/30', style: 'subheader' },
        { text: this.letterObj.from },
 
        { text: 'To', style: 'subheader' },
        this.letterObj.to,
 
        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
 
        {
          ul: [
            'Bacon',
            'Rips',
            'BBQ',
          ]
        }
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
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
 
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
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
