import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { map, switchMap } from 'rxjs/operators'
import { Observable, combineLatest, of } from 'rxjs'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  //Array
  cartArr: any = []
  all$: Observable<any> | undefined


  constructor(private store: AngularFirestore, public authservice: AuthService) { }

  ngOnInit(): void {
    let interval = setInterval(() => {
      if (this.authservice.currentUser_id) {
        this.get(this.authservice.currentUser_id)
        clearInterval(interval)
      }
    }, 1000);
  }

  get(user_id: any) {
    this.store.collection('cart', ref => ref.where('user_id', '==', user_id)
    ).snapshotChanges().subscribe((response) => {
      this.cartArr = response.map(item =>
        Object.assign({ id: item.payload.doc.id }, item.payload.doc.data())
      );
      console.log(this.cartArr)
    })
  }

}
function uniq(arg0: any[]) {
  throw new Error('Function not implemented.');
}

