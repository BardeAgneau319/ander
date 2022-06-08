import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../notes';
import { NotesService } from '../notes.service';
import { Session } from '../session';
import { SessionsService } from '../sessions.service';
import { SpeakersService } from '../speakers.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss'],
})
export class SessionDetailsComponent implements OnInit {

  // Path parameters
  id: number;

  session: Session;

  notes: Note;
  notesUpdated: boolean = false;

  readonly IMAGE_ROOT = SpeakersService.IMAGE_ROOT

  constructor(
    private activatedRoute: ActivatedRoute,
    private sessionsService: SessionsService,
    private notesService: NotesService
  ) { }

  async ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params["id"]);
    this.sessionsService.getSessionById(this.id).subscribe(s => this.session=s);
    this.notes = await this.notesService.getNote(this.id);
  }

  onNotesInput(event: any) {
    this.notes.content = event.target.value;

    this.notesUpdated = true;
  }

  async saveNotes() {
    await this.notesService.saveNote(this.notes);
    this.notesUpdated = false;
  }

  async startCamera() {
    const { dataUrl } = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });

    this.notes.pictures.push(dataUrl);
    this.notesUpdated = true;
  }
}
