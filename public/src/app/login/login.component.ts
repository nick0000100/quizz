import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Router } from '@angular/router'
import { User } from './../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  users: Array<User> = [];
  searchStr: String = '';
  message: String = '';

  constructor(private _apiService: ApiService, private _router: Router) {
    this.getUsers();
  }

  ngOnInit() {
    this.makeUser();
  }
  
  makeUser() {
    let username = prompt("Please enter a name");
    this.user.name = username;
    if(username) {
      this._apiService.register(this.user);
    }else{
      console.log("there")
    }
    this.user = new User();
    this.getUsers();
  }

  play() {
    this._router.navigate(['lets_play']);
  }

  getUsers() {
    this._apiService.getUsers()
    .then(users => {
      this.users = users;
    })
   };

}
