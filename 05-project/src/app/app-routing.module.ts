import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { NoteCreationComponent } from './note-creation/note-creation.component';
import { PhoneComponent } from './phone/phone.component';
import { SessionDetailsComponent } from './session-details/session-details.component';
import { SessionsComponent } from './sessions/sessions.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sessions',
    component: SessionsComponent
  },
  {
    path: 'sessions/:id',
    component: SessionDetailsComponent
  },
  {
    path: 'sessions/:id/notes',
    component: NoteCreationComponent
  },
  {
    path: 'phone',
    component: PhoneComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
