import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SessionsComponent } from './sessions/sessions.component';
import { NoteCreationComponent } from './note-creation/note-creation.component';
import { PhoneComponent } from './phone/phone.component';
import { SessionDetailsComponent } from './session-details/session-details.component';
import { HomePage } from './home/home.page';

@NgModule({
  declarations: [
    AppComponent, 
    HomePage,
    SessionsComponent, 
    SessionDetailsComponent,
    NoteCreationComponent, 
    PhoneComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
