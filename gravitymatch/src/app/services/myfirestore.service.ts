import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
   id?: string;
   age: number;
   gender: string;
   goal: string;
   race: string;
   random: number;
}

@Injectable({
   providedIn: 'root'
})
export class MyfirestoreService {

   private usersCollection: AngularFirestoreCollection<User>;
   max_int: number = 2147483647;   // max 32-bit signed int
   //private users: Observable<User[]>;

   constructor(
      private afs: AngularFirestore,
      private afAuth: AngularFireAuth,
   ) {
      this.usersCollection = this.afs.collection<User>('users');

   }

   getUsers() {

      return this.usersCollection.snapshotChanges();
   }

   getRandomUser() {

      return this.afs.collection<User>('users', ref => {
         // Compose a query using multiple .where() methods
         return ref
         .where('random', '>', this.randomInt())
         .orderBy('random')
         .limit(1)

      }).snapshotChanges();

   }

   getMatchmaker() {

   }

   getMatches() {
      console.log("ERROR: NOT IMPLMENTED getMatches");
      return this.afs.collection('matches').snapshotChanges();
   }

   getMatch(document) {
      console.log("ERROR: NOT IMPLMENTED getMatches");
      return this.afs.collection('matches').doc<User>(document).valueChanges();
   }

   getMatchmakerResult() {
      console.log("getMatchmakerResult");

      console.log(this.afAuth.auth.currentUser)

      return this.afs.collection('matchmakers').doc(this.afAuth.auth.currentUser.uid).ref;



      // return this.afAuth.authState.subscribe(auth => {
      //    this.afs.collection('matchmakers').doc(auth.uid).snapshotChanges().subscribe((data) => {
      //       console.log(data);
      //       return(data);
      //    });
      // });
      //
      // return this.afs.collection('matchmakers').doc(auth.uid, ref => {
      //    // Compose a query using multiple .where() methods
      //    return ref
      //    .where('random', '>', this.randomInt())
      //    .orderBy('random')
      //    .limit(1)
      //
      // }).snapshotChanges();
   }

   setMatch(client_id, rando_id, score) {

      console.log("TODO: sort the matches so they aren't saved twice");
      var match = {'client': client_id+'_'+rando_id , 'score': score};
      //var match = {'cid': client_id, 'rid':rando_id, 'score': score};

      this.afAuth.authState.subscribe(auth => {

         this.afs.collection('matchmakers').doc(auth.uid)
         .update(match)
         .then(() => {
            // update successful (document exists)
         })
         .catch((error) => {
            //console.log('Error updating user', error); // (document does not exists)
            this.afs.collection('matchmakers').doc(auth.uid)
            .set(match);
         });
      });
   }

   getClients() {
      console.log("ERROR: NOT IMPLMENTED getClients");
      return this.afs.collection('clients').snapshotChanges();
   }

   getUser(id) {
      return this.usersCollection.doc<User>(id).valueChanges();
   }

   getDocument(path: string) {

      this.afAuth.authState.subscribe(auth => {
         this.afs.doc(path + auth.uid).valueChanges()
         .subscribe((data) => {
            console.log(data);
            return(data);
         });
      });

   }

   getUserData():any {
      return this.afAuth.user.toPromise
   }

   updateUser(user: User, id: string) {
      return this.usersCollection.doc(id).update(user);
   }

   addUser(user: User) {
      console.log("myfirestore");
      console.log(user);
      this.afs.collection("users").add(user)
      .then(function(docRef) {
         console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
         console.error("Error adding document: ", error);
      });

   }

   removeUser(id) {
      return this.usersCollection.doc(id).delete();
   }

   randomInt() {
      // generate random value between 1 and maxInt inclusive of both values
      return Math.floor(Math.random() * this.max_int) + 1;
   }

}
