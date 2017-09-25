import { Component, OnInit } from '@angular/core';
import { Question } from './../question';
import { ApiService } from './../api.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  newQuestion = new Question();

  constructor(
    private _apiService: ApiService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  addQuestion() {
    console.log(this._apiService.newQuestion(this.newQuestion));
    this._router.navigate(['']);
  }

  cancel() {
    this._router.navigate(['']);
  }

}
