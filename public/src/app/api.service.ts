import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs';

@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  register(user) {
    return this._http.post('/register', user)
    .subscribe(
      (res) => {
        console.log("Register successful");
      },
      (err) => {
        console.log("An error has been encountered", err);
      }
    )
  };

  newQuestion(question) {
    return this._http.post('/newQuestion', question)
    .subscribe(
      (res) => {
        console.log("Created new question");
      },
      (err) => {
        console.log("Question not made");
      }
    )
  };

  getQuestions() {
    return this._http.get('/getQuestions')
    .map(data => data.json())
    .toPromise();
  }

  getUsers() {
    return this._http.get('/getUsers')
    .map(data => data.json())
    .toPromise();
  }

  logOut() {
    return this._http.get('/logout')
    .map(data => data.json())
    .toPromise();
  }

  findCurrent() {
    return this._http.get('/current')
    .map(data => data.json())
    .toPromise();
  }

  updateScore( score) {
    let header = new Headers();
    header.append('Score', score);
    return this._http.post('/score', score, {headers: header})
    .map(data => data.json())
    .toPromise();
  }
}