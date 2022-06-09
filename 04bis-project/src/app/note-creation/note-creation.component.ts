import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Note } from '../notes';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-creation',
  templateUrl: './note-creation.component.html',
  styleUrls: ['./note-creation.component.scss'],
})
export class NoteCreationComponent implements OnInit {
  notes: Note;

  notesUpdated: boolean = false;
  
  @Input() id!: number;
  constructor(
    private notesService: NotesService
  ) { }

  async ngOnInit(): Promise<void> {
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
