import { Component } from '@angular/core';

import { SessionsService } from '../sessions.service';
import { SpeakersService } from '../speakers.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
})
export class SessionsComponent {

  sessions = this.sessionsService.getSessions();

  constructor(
    private sessionsService: SessionsService,
    private speakersService: SpeakersService,
  ) { }
}
