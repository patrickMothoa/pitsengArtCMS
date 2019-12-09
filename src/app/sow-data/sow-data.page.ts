import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-sow-data',
  templateUrl: './sow-data.page.html',
  styleUrls: ['./sow-data.page.scss'],
})
export class SowDataPage implements OnInit {


  a = []

  constructor(public DataService : DataService) { }

  ngOnInit() {
 
    this.a = this.DataService.myArray;
   

      console.log("Data in the Service ====   ", this.a);


  }


  ionViewWillEnter(){
   
  }

}
