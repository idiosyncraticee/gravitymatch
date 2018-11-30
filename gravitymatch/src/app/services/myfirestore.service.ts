import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class User {
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

   getMatchmakerResult(client_id) {

      return this.afs.collection('matchmakers', ref => {

         // Compose a query using multiple .where() methods
         return ref
         .where("mm", "==", this.afAuth.auth.currentUser.uid)
         .where('cid', '==', client_id)

      }).snapshotChanges();

   }

   getMatchResult(client_id, rando_id) {

      return this.afs.collection('matches', ref => {

         return ref
         .where("rid", "==", rando_id)
         .where('cid', '==', client_id)

      }).snapshotChanges();

   }

   setMatch(client_id, rando_id, score) {

      console.log("TODO: sort the matches so they aren't saved twice");
      var match = {'mm': this.afAuth.auth.currentUser.uid, 'cid': client_id, 'rid': rando_id, 'score': score};

      return this.afs.collection('matchmakers').add(match)

   }

   getClients() {
      console.log("ERROR: NOT IMPLMENTED getClients");
      return this.afs.collection('clients').snapshotChanges();
   }

   getUser(id) {
      return this.usersCollection.doc<User>(id).valueChanges();
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
      //return Math.floor(Math.random() * this.max_int) + 1;
      return 69;
   }

}
