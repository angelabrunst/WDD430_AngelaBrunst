import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  private entries: Entry[] = [];
  private entriesUpdated = new Subject<Entry[]>();

  constructor() { }

  getEntries() {
    return [...this.entries];
  }

  getEntriesUpdateListener() {
    return this.entriesUpdated.asObservable();
  }

  addEntry(joke: string, answer: string) {
    const entry: Entry = {joke: joke, answer: answer};
    this.entries.push(entry);
    this.entriesUpdated.next([...this.entries]);
  }
}
