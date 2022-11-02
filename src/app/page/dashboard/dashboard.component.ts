import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth.service';

declare const UIkit: any, makeid: any

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  productData: Product | any = {
    name: '',
    color: [],
    seller_id: '',
    date: ''
  }

  colorData: any = {
    color: null,
    price: null
  }

  updateSetting = {
    color: false,
    product: false
  }

  userData: any = {
    name: '',
    email: '',
    type: ''
  }

  //Array
  productArr: any = []
  colorArr: any = [
    { title: 'Red', value: 'red' },
    { title: 'Green', value: 'green' },
    { title: 'Blue', value: 'blue' },
  ]

  //Variable
  genertare_id_element: any = makeid(12)
  color_index: any
  product_id: any
  loaded: boolean = false

  constructor(private store: AngularFirestore, public authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    let interval = setInterval(() => {
      if (this.authservice.currentUser_id) {
        this.getUserDetail(this.authservice.currentUser_id)

        clearInterval(interval)
      }
    }, 1000);
  }

  getUserDetail(user_id: any) {
    this.store.collection('users').doc(user_id).get().subscribe((response) => {
      this.userData = response.data()

      if (this.userData.type === 'buyer') {
        this.router.navigateByUrl('/')
        this.notification('You Are Not Seller')
      }
      else this.loaded = true

      this.get(user_id)
    })
  }

  addColor() {
    if (this.isExist(this.colorData.color)) this.notification('Color Is Exist')
    else {
      if (this.colorData.color === null || this.colorData.price === '' || this.colorData.price === null) {
        console.log('pleae')
        this.notification('pleae')
      } else {
        this.productData.color.push(this.colorData)
        this.colorData = { color: null, price: null }
      }
    }
  }

  isExist(color: any) {
    return this.productData.color.some((e: any) => e.color === color)
  }

  oneColor(index: any) {
    this.updateSetting.color = true
    this.color_index = index
    this.colorData = {
      color: this.productData.color[index].color,
      price: this.productData.color[index].price
    }

  }

  updateColor() {
    this.productData.color[this.color_index] = this.colorData
    this.updateSetting.color = false
    this.colorData = { color: null, price: null }
  }

  deleteColor(index: any) {
    this.productData.color.splice(index, 1)
  }

  add() {
    this.productData.seller_id = this.authservice.currentUser_id
    this.productData.date = Date.now()
    if (this.productData.seller_id !== null && this.productData.seller_id !== '' && this.productData.color.length !== 0 && this.productData.name !== '') {
      console.log(this.productData)
      this.store.collection('product').add(this.productData).then(() => {
        UIkit.modal(`#modal-add-product_${this.genertare_id_element}`).hide();
        this.notification('Add Successfully')
      }).catch((err) => {
        throw err
      })
    } else {
      this.notification('please enter all requirement')
    }

  }

  get(seller_id: any) {
    this.store.collection('product', ref => ref.where('seller_id', '==', seller_id)
    ).snapshotChanges().subscribe((response) => {
      this.productArr = response.map(item =>
        Object.assign({ id: item.payload.doc.id }, item.payload.doc.data())
      );
    })
  }

  delete(id: any) {
    this.store.collection('product').doc(id).delete();
  }

  one(id: any) {
    this.updateSetting.product = true
    this.product_id = id
    this.store.collection('product').doc(id).get().subscribe((response) => {
      this.productData = response.data()
      UIkit.modal(`#modal-add-product_${this.genertare_id_element}`).show();
    })
  }

  update() {
    this.productData.seller_id = this.authservice.currentUser_id
    this.productData.date = Date.now()
    if (this.productData.seller_id !== null && this.productData.seller_id !== '') {
      this.store.collection('product').doc(this.product_id).update(this.productData).then(() => {
        UIkit.modal(`#modal-add-product_${this.genertare_id_element}`).hide();
        this.notification('Update Successfully')
      }).catch((err) => {
        throw err
      })
    }

  }

  defaultValue() {
    this.productData = {
      name: '',
      color: [],
      seller_id: '',
      date: Date.now()
    }

    this.colorData = {
      color: null,
      price: null
    }

    this.updateSetting = {
      color: false,
      product: false
    }

    this.color_index = undefined
    this.product_id = undefined
  }

  notification(message: any) {
    UIkit.notification({
      message: '<div class="full_left_"><h5 class="m-0 pl-2 blackC_ f_Medium">' + message + '</h5></div>',
      pos: 'bottom-right',
      timeout: 4000
    });
  }

}
