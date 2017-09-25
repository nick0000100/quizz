import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { PlayComponent } from './play/play.component'
import { AddComponent } from './add/add.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent

  },
  {
    path: 'lets_play',
    pathMatch: 'full',
    component: PlayComponent
  },
  {
    path: 'new_question',
    pathMatch: 'full',
    component: AddComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
