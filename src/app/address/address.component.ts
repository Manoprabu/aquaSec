import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from './../notification.service';

interface addressObj {
  address1: String;
  city: String;
  state: String;
  postalCode: String
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressList: Observable<addressObj[]> | undefined;
  adList: addressObj[] = [];
  panelOpenState = false;
  addressForm: addressObj = {
    address1: '',
    state: '',
    city: '',
    postalCode:''
  }
  
  constructor(private http: HttpClient, private notifyService : NotificationService) {}

  ngOnInit(): void {
    let localStoreValue = localStorage.getItem('addressList');
    if(localStoreValue == null) {
      this.getAddresses();
      setTimeout(()=>{
        this.localStorageSet();
      },2000);
    } else {
      this.adList = JSON.parse(localStoreValue);
    }
  }

  getAddresses() {
    this.addressList = this.http.get<addressObj[]>("http://localhost:8000/addresses");
    this.addressList.subscribe(data => this.adList = data);
  }

  updateAddress(index: number, ad: addressObj) {
    ad.address1 = this.addressForm.address1;
    ad.city = this.addressForm.city;
    ad.state = this.addressForm.state;
    ad.postalCode = this.addressForm.postalCode;
    this.localStorageSet();
    this.notifyService.showUpdate("Record Updated Successfully");
  }

  deleteAddress(index: number) {
    this.adList.splice(index, 1);
    this.localStorageSet();
    this.notifyService.showDelete("Record Deleted Successfully");
  }
  
  localStorageSet() {
    localStorage.setItem('addressList', '');
    localStorage.setItem('addressList', JSON.stringify(this.adList));
  }

  cardExpand(ad: addressObj) {
     this.addressForm.address1 = ad.address1;
     this.addressForm.city = ad.city;
     this.addressForm.state = ad.state;
     this.addressForm.postalCode = ad.postalCode;
  }
}
