import { Component, OnInit } from '@angular/core';
import {} from '../user-invoices/user-invoices.page'

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  public isPaymentRecieved =false

  constructor() { }

  ngOnInit() {
  }

}
