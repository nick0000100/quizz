import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Router } from '@angular/router'
import { Question } from './../question';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  allQuestions: Array<Question> = [];
  pickThree: Array<Question> = [];
  username: String = "";
  answer1;
  answer2;
  answer3;
  

  constructor(private _apiService: ApiService,private _router: Router) {
    this.getQuestions();
    this.findUser();
  }

  ngOnInit() {
  }

  getQuestions() {
   this._apiService.getQuestions()
   .then(questions => {
     this.allQuestions = questions;
     this.findThree();
   })
  };

  findThree() {
    for(let i = 0; i <= 2; i++) {
      let rand = Math.floor(Math.random() * this.allQuestions.length)
      this.pickThree.push(this.allQuestions[rand]);
      this.allQuestions.splice(rand, 1);
    }
  };

  findUser() {
    this._apiService.findCurrent()
    .then((user) => {
      this.username = user.name;
    })
    .catch((err) => {
      console.log(err);
      // this._router.navigate(['']);
    })
  }

  submit() {
    let count = 0;
    if(this.answer1 == 1) {
      count++;
    }
    if(this.answer2 == 1) {
      count++;
    }
    if(this.answer3 == 1) {
      count++;
    }
    this._apiService.updateScore(count);
    let check = true;
    this._router.navigate([count]);
  }

  cancel() {
    this._router.navigate(['']);
  }

}
