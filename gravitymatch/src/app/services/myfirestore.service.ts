import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Platform, LoadingController, AlertController } from '@ionic/angular';

export class User {
   id?: string;
   name?: string;
   age?: number;
   gender?: string;
   goal?: string;
   race?: string;
   random?: number;
   score?: number;
   attempts?: number;
   matches?: any;
   realuser?: any;
}

@Injectable({
   providedIn: 'root'
})
export class MyfirestoreService {

   private usersCollection: AngularFirestoreCollection<User>;
   max_int: number = 2147483647;   // max 32-bit signed int
   //private users: Observable<User[]>;
   showLoading: any;
   client_data: User;

   constructor(
      public afs: AngularFirestore,
      private afAuth: AngularFireAuth,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
   ) {
      this.usersCollection = this.afs.collection<User>('users');

   }

   getUsers() {

      return this.usersCollection.snapshotChanges();
   }

   getFilteredUsers() {
      console.log("getFilteredUsers");

      return this.afs.collection<User>('users', ref => {
         // Compose a query using multiple .where() methods
         return ref

      }).snapshotChanges();


   }

   listenRandomUser() {

      return this.afs.collection<User>('users', ref => {
         // Compose a query using multiple .where() methods
         return ref
         //.where('realuser', '==', 0)
         .where('random', '>', this.randomInt())
         .orderBy('random')
         .limit(1)

      }).snapshotChanges();

   }

   async getRandomUser() {

      let cid:string;
      let client_data:any;
      var that=this;
      console.log("getRandomUser");
      await this.startLoading("Finding someone to match")
         .then(async () => {
            try {
               await this.afs.firestore.collection("users")
                  .where('random', '>', this.randomInt())
                  .where('realuser','==',0)
                  .orderBy('random')
                  .limit(1)
                  .get()
                  .then(function(querySnapshot) {
                     querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        cid = doc.id;
                        client_data = doc.data();
                        client_data.id = doc.id;
                     });
               that.showLoading.dismiss();
            })
         } catch (error) {
            console.log(error);
            this.showLoading.dismiss();
            this.errorAlert(error.message);
         }
      });
      this.client_data=client_data;
      return cid;

   }

   getClientData() {
      console.log("getClientData");
      console.log(this.client_data);
      return this.client_data;
   }

   getUserData(id) {
      return this.usersCollection.doc<User>(id).valueChanges();
   }

   getLeaderboardData() {

      return this.afs.collection<User>('users', ref => {
         return ref
         .where('score', '>', -1e6)
         .orderBy('score', 'desc')
      }).snapshotChanges();

   }

   getMatchmakerData(mid:string) {

      // this.afs.firestore.collection("users").doc(mid)
      //     .onSnapshot(function(doc) {
      //         console.log("Current data: ", doc.data());
      //     });

      return this.afs.collection<User>('users', ref => {
         return ref
         .where('id', '==', mid)
      }).snapshotChanges();

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

         // Compose a query using multiple .where() methods
         return ref
         .where("cid", "==", client_id)
         .where("rid", "==", rando_id)

      }).snapshotChanges();



   }
   //
   // updateMatch(mid, client_id, rando_id, score) {
   //
   //
   //    //TODO: sort the matches so they aren't saved twice
   //
   //
   //    //return this.afs.collection('users').add(match)
   //    console.log("client_id");
   //    console.log(client_id);
   //    var that = this;
   //    this.afs.firestore.collection("users").doc(mid)
   //    .get()
   //    .then(function(doc) {
   //       //
   //          return that.afs.firestore.runTransaction(function(transaction) {
   //             // This code may get re-run multiple times if there are conflicts.
   //             return transaction.get(doc.ref).then(function(doc) {
   //                if (!doc.exists) {
   //                   throw "Document does not exist!";
   //                }
   //
   //                var existing_matches:any;
   //                if(doc.data().matches==null) {
   //                   console.log("AINT ANY MATCHES");
   //                   existing_matches=[];
   //                } else {
   //                   existing_matches = doc.data().matches;
   //                }
   //
   //                existing_matches.push({'cid': client_id, 'rid': rando_id, 'score': score});
   //
   //                console.log("existing_matches");
   //                console.log(existing_matches);
   //                console.log("doc.data()");
   //                console.log(doc.data());
   //                transaction.update(doc.ref, { matches: existing_matches });
   //
   //             });
   //          }).then(function() {
   //             console.log("Transaction successfully committed!");
   //          }).catch(function(error) {
   //             console.log("Transaction failed: ", error);
   //          });
   //       //
   //       // });
   //    })
   //    .catch(function(error) {
   //       console.log("Error getting documents: ", error);
   //    });
   //
   //
   // }

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

      this.afs.collection("users").add(user)
      .then(function(docRef) {
         console.log("Document written with ID: ", docRef.id);
         return docRef.id;
      })
      .catch(function(error) {
         console.error("Error adding document: ", error);
      });

   }

   updateMatchmaker(mid: string, score: number, client_id, rando_id, rating) {
      console.log("updateMatchmakerScore");
      var that = this;
      this.afs.firestore.collection("users").where("id", "==", mid)
      .get()
      .then(function(querySnapshot) {

         querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            return that.afs.firestore.runTransaction(function(transaction) {
               // This code may get re-run multiple times if there are conflicts.
               return transaction.get(doc.ref).then(function(doc) {
                  if (!doc.exists) {
                     throw "Document does not exist!";
                  }

                  var existing_matches:any;
                  if(doc.data().matches==null) {
                     console.log("AINT ANY MATCHES");
                     existing_matches=[];
                  } else {
                     existing_matches = doc.data().matches;
                  }

                  existing_matches.push({'cid': client_id, 'rid': rando_id, 'score': rating});

                  console.log("existing_matches");
                  console.log(existing_matches);
                  console.log("doc.data()");
                  console.log(doc.data());

                  var new_score = doc.data().score + score;
                  var new_attempts = doc.data().attempts + 1;
                  transaction.update(doc.ref, { matches: existing_matches, score: new_score, attempts: new_attempts });
               });
            }).then(function() {
               console.log("updateMatchmakerScore Transaction successfully committed!");
            }).catch(function(error) {
               console.log("updateMatchmakerScore Transaction failed: ", error);
            });

         });
      })
      .catch(function(error) {
         console.log("Error getting documents: ", error);
      });


   }

   removeUser(id) {
      return this.usersCollection.doc(id).delete();
   }

   randomInt() {
      // generate random value between 1 and maxInt inclusive of both values
      return Math.floor(Math.random() * this.max_int) + 1;
      //return 69;
   }

   async startLoading(message:string) {
      this.showLoading = await this.loadingCtrl.create({
         message: message
      });
      this.showLoading.present();
   }

   async errorAlert(errMsg: string) {

      const alert = await this.alertCtrl.create({
         header: 'Error',
         message: errMsg,
         buttons: ['Ok']
      });
      return await alert.present();
   }
}
