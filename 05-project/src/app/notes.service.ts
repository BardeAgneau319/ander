import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Note } from './notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

  async saveNote(note: Note): Promise<void> {
    await Storage.set({
      key: note.id.toString(),
      value: JSON.stringify(note)
    })
  }

  async getNote(id: number): Promise<Note> {
    const { value } = await Storage.get({ key: id.toString() });

    if (value === null) {
      return {
        id: id,
        content: '',
        pictures: []
      };
    }

    return JSON.parse(value);
  }
}
