import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cart, Product } from 'src/app/model/model';
import { AuthService } from 'src/app/services/auth.service';

declare const UIkit: any, makeid: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userData: any = {
    name: '',
    email: '',
    type: ''
  }

  productData: Product | any = {
    name: '',
    color: [],
    seller_id: '',
    date: ''
  }

  cartData: Cart | any = {
    user_id: '',
    color: '',
    product_id: '',
    total: 0,
    date: 0
  }

  //Array
  productArr: any = []

  //Variable
  genertare_id_element: any = makeid(12)
  user_id: any
  product_id: any
  selectColor: any = null

  constructor(public authservice: AuthService, private store: AngularFirestore) { }

  ngOnInit(): void {
    let interval = setInterval(() => {
      if (this.authservice.currentUser_id) {
        this.getUserDetail(this.authservice.currentUser_id)
        clearInterval(interval)
      }
    }, 1000);
    this.getProduct()
  }

  getUserDetail(user_id: any) {
    this.user_id = user_id
    this.store.collection('users').doc(user_id).get().subscribe((response) => {
      this.userData = response.data()
    })
  }

  getProduct() {
    this.store.collection('product', ref => ref.orderBy('date', 'desc')
    ).snapshotChanges().subscribe((response) => {
      this.productArr = response.map(item =>
        Object.assign({ id: item.payload.doc.id }, item.payload.doc.data())
      );
    })
  }

  oneProduct(id: any) {
    this.product_id = id
    this.selectColor = null
    this.store.collection('product').doc(id).get().subscribe((response) => {
      this.productData = response.data()
      UIkit.modal(`#modal-product_${this.genertare_id_element}`).show();
    })
  }

  select() {

    let price = Number(this.selectColor.price)
    this.cartData = { total: price + (price * 0.1) + 5 }
  }

  addCart() {
    this.cartData.user_id = this.authservice.currentUser_id
    this.cartData.product_id = this.product_id
    this.cartData.date = Date.now()
    this.cartData.color = this.selectColor.color

    if (this.cartData.user_id !== null && this.cartData.user_id !== '' && this.cartData.product_id !== '' && this.cartData.total !== 0 && this.selectColor !== null) {
      this.store.collection('cart').add(this.cartData).then(() => {
        UIkit.modal(`#modal-product_${this.genertare_id_element}`).hide();
        this.notification('Add Successfully')
      }).catch((err) => {
        throw err
      })
    } else {
      this.notification('please enter all requirement')
    }

  }

  num(n: any) {
    return Number(n)
  }

  notification(message: any) {
    UIkit.notification({
      message: '<div class="full_left_"><h5 class="m-0 pl-2 blackC_ f_Medium">' + message + '</h5></div>',
      pos: 'bottom-right',
      timeout: 4000
    });
  }

}
