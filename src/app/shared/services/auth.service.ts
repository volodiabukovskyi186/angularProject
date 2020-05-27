import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  userStatus: Subject<any> = new Subject<any>();
  userChecker: boolean;
  singOutStatus: Subject<boolean> =  new Subject<boolean>();
  loginError:Subject <boolean>=new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) { }

  singUp(email: string, password: string) {

    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userResponse) => {
        const user = {
          id: userResponse.user.uid,
          userName: userResponse.user.email,
          role: 'user'
        };
        this.firestore.collection('users').add(user)
          .then(user => {
            user.get().then(x => {
              console.log(x.data());
              this.currentUser = x.data()
              this.router.navigate(['/']);
            })
          })
          .catch(err => {
            console.log('Add to firestore', err);
          });
      })
      .catch(err => {
        console.log('Create user', err);
      });
  }

  login(email?: string, password?: string) {

    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.firestore.collection('users').ref.where('userName', '==', user.user.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            localStorage.setItem('user', JSON.stringify(this.currentUser))
            if (userRef.data().role !== 'admin') {
              this.userChecker = true;
              this.userStatus.next(this.currentUser);
              this.singOutStatus.next(true)
              this.router.navigate([`/user`]);
              console.log( this.currentUser);
            }
          
            else  {
              this.userChecker = true;
              this.userStatus.next(this.currentUser );
              this.singOutStatus.next(true)
              this.router.navigate(['/admin']);
              // console.log('admin');
            }

          })
        })
        this.loginError.next(false)
      })
     
      .catch(err=>{
        this.loginError.next(true)
       
      })
    
  }
  logOut() {
    this.afAuth.signOut()
      .then(() => {
        console.log('user signed our')
        this.currentUser = null;
        this.userChecker = false;
        localStorage.removeItem('user')
        this.singOutStatus.next(false)
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.log('Sign out', err);
      })
  }

  isLogin(): boolean {
    return this.userChecker;
  }

}
