import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Session } from '../session';
import { SessionsService } from '../sessions.service';
import { SpeakersService } from '../speakers.service';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss'],
})
export class SessionDetailsComponent implements OnInit {

  // Path parameters
  id: number;

  session: Session;

  notes: {
    content: string,
    photos: string[],
  } = { content: "", photos: [] };
  notesUpdated: boolean = false;

  readonly IMAGE_ROOT = SpeakersService.IMAGE_ROOT

  constructor(
    private activatedRoute: ActivatedRoute,
    private sessionsService: SessionsService,
  ) { }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params["id"]);
    this.sessionsService.getSessionById(this.id).subscribe(s => this.session=s);
  }

  onNotesInput(event: any) {
    this.notes.content = event.target.value;

    this.notesUpdated = true;
  }
}
