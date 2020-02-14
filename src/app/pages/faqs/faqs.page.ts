import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase'
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {

  dbFaq = firebase.firestore();

  SearchInfor = [];
  searchResults = [];

   firstQues = {
     question1: '',
     answer1: ''
   }
   SecondQues = {
    question2: '',
    answer2: ''
  }
  refundQues = {
    question1: '',
    answer1: ''
  }
  refunds1Ques = {
   question2: '',
   answer2: ''
 }
 returnQues = {
  question1: '',
  answer1: ''
}
returns1Ques = {
 question2: '',
 answer2: ''
}
technicalQues = {
  question1: '',
  answer1: ''
}
technical1Ques = {
 question2: '',
 answer2: ''
}
  refunds: string;
  return :string;
  technical :string;
  constructor(public modalController: ModalController) { }

  ngOnInit(){

 this.dbFaq.collection('FAQS').doc('OrdersShipment').collection('questions').doc('Question1').get().then((data) => {

    this.firstQues.answer1 = data.data().answer;
    this.firstQues.question1 = data.data().question1;

 })
 this.dbFaq.collection('FAQS').doc('OrdersShipment').collection('questions').doc('question2').get().then((data) => {

  this. SecondQues.answer2 = data.data().answer;
  this. SecondQues.question2 = data.data().question2;

})
this.dbFaq.collection('FAQS').doc('Refunds').collection('Questions').doc('question1').get().then((data) => {

  this.refundQues.answer1 = data.data().answer;
  this.refundQues.question1 = data.data().question1;

})
this.dbFaq.collection('FAQS').doc('Refunds').collection('Questions').doc('question2').get().then((data) => {

this. refunds1Ques.answer2 = data.data().answer;
this. refunds1Ques.question2 = data.data().question2;

})
this.dbFaq.collection('FAQS').doc('Returns').collection('Questions').doc('question1').get().then((data) => {

  this.returnQues.answer1 = data.data().answer;
  this.refundQues.question1 = data.data().question1;

})
this.dbFaq.collection('FAQS').doc('Returns').collection('Questions').doc('question2').get().then((data) => {

this. returns1Ques.answer2 = data.data().answer;
this. returns1Ques.question2 = data.data().question2;

})
this.dbFaq.collection('FAQS').doc('Technical').collection('Questions').doc('question1').get().then((data) => {

  this.technicalQues.answer1 = data.data().answer;
  this.technicalQues.question1 = data.data().question1;

})
this.dbFaq.collection('FAQS').doc('Technical').collection('Questions').doc('question2').get().then((data) => {

this. technical1Ques.answer2 = data.data().answer;
this. technical1Ques.question2 = data.data().question2;

})
// this.dbFaq.collection('FAQS').doc('Refunds').get().then((data) => {

//   this.refunds = data.data().refunds;

// })
// this.dbFaq.collection('FAQS').doc('Returns').get().then((data) => {

//   this.return = data.data().returns;

// })
// this.dbFaq.collection('FAQS').doc('Technical').get().then((data) => {

//   this.technical = data.data().technical;

// })

// this.dbFaq.collection('FAQS').get().then((data) => {
//   this.SearchInfor.push(data.data())
// })

// this.firstQues.answer1 = data.data().answer;
//     this.firstQues.question1 = data.data().question1;

    this.SearchInfor.push({
      answer1: "hahahaha you good",
      question1: 'bad luck'
    })

console.log(this.SearchInfor);

  }
  
dismiss(){
  this.modalController.dismiss({
    'dismissed':true
  });
}

getItems(ev: any) {
  // Reset items back to all of the items
  // set val to the value of the searchbar
  const val = ev.target.value;
​
  // if the value is an empty string don't filter the items
  // console.log(val);
  if (val && val.trim() != "") {
    this.searchResults = this.SearchInfor.filter(item => {
      return item.toString().indexOf(val.toString().toLowerCase()) > -1;
    });
    // console.log('Results = ',this.searchResults);
  } else if (val != " ") {
    // this.testArrays = this.SearchInfor.filter(item => {
    //   return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
    // });
    this.searchResults = this.SearchInfor.filter(item => {
      return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  } else if (val == "") {
    this.searchResults = [];
  }
​
  console.log(this.SearchInfor);
  console.log(this.searchResults);
  
}


}
