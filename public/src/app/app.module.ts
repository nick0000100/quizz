import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EqualValidator } from './equal-validator.directive';

import { ApiService } from './api.service';
import { LoginComponent } from './login/login.component';
import { PlayComponent } from './play/play.component';
import { AddComponent } from './add/add.component';
import { NavComponent } from './nav/nav.component';
import { FilterPipe } from './filter.pipe'

@NgModule({
  declarations: [
    AppComponent,
    EqualValidator,
    LoginComponent,
    PlayComponent,
    AddComponent,
    NavComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
