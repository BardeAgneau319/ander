import { Injectable } from '@angular/core';
import { Note } from './notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Map<number, Note> = new Map<number, Note>();

  constructor() { }

  saveNote(note: Note): void {
    this.notes.set(note.id, note);
  }

  getNote(id: number): Note {
    if (this.notes.has(id)) {
      return this.notes.get(id);
    }

    return {
      id: id,
      content: '',
      pictures: []
    };
  }
}
