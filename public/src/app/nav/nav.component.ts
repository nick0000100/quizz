import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _apiService: ApiService, private _router: Router) { }

  ngOnInit() {
  }

  logout() {
    this._apiService.logOut();
    console.log("out")
    this._router.navigate(['']);
  }

}
