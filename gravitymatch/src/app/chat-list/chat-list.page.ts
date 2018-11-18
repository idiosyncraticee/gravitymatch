import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

  threads: any;
  constructor(
     private router: Router,
  ) { }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    this.threads =   [
       { name: "Ryan", age: "27", location: "22 miles", mm: '12', rank: "4", last_text: "How does Starbucks sound?", show: "yes" },
       { name: "Robbie", age: "27", location: "22 miles", mm: '12', rank: "4", last_text: "I had a great time last night!", show: "yes" },
       { name: "Kyle", age: "27", location: "22 miles", mm: '12', rank: "4", last_text: "You like antique banjos too!?!", show: "yes" },
       { name: "Chris", age: "27", location: "22 miles", mm: '12', rank: "4", last_text: "k", show: "yes" },
       { name: "Patricia", age: "27", location: "22 miles", mm: '12', rank: "4", last_text: "I hope you find who you're looking for :)", show: "yes" },
       { name: "Joe", age: "27", location: "22 miles", mm: '12', rank: "4", last_text: "How weird is it that we went to high school together?!", show: "yes" },
       { name: "Patrick", age: "27", location: "22 miles", mm: '12', rank: "4", last_text: "See you this afternoon!", show: "yes" },
    ];
 }
 
  ngOnInit() {
  }

}
