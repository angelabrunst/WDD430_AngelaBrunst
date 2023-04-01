import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  private entries: Entry[] = [];
  private entriesUpdated = new Subject<Entry[]>();

  constructor(private http: HttpClient ) { }

  getEntries() {
    this.http.get<{message: string, entries: any}>('http://localhost:3000/api/entries')
      .pipe(map((entryData) => {
        return entryData.entries.map(entry => {
          return {
            joke: entry.joke,
            answer: entry.answer,
            id: entry._id
          }
        });
      }))
      .subscribe((transformedEntries) => {
        this.entries = transformedEntries;
        this.entriesUpdated.next([...this.entries]);
      });
  }

  getEntriesUpdateListener() {
    return this.entriesUpdated.asObservable();
  }

  addEntry(joke: string, answer: string) {
    const entry: Entry = {id: null, joke: joke, answer: answer};
    this.http.post<{message: string, entryId: string}>('http://localhost:3000/api/entries', entry)
      .subscribe((responseData) => {
        const id = responseData.entryId;
        entry.id = id;
        this.entries.push(entry);
        this.entriesUpdated.next([...this.entries]);
      });
  }

  deleteEntry(entryId: string) {
    this.http.delete('http://localhost:3000/api/entries/' + entryId)
      .subscribe(() => {
        const updatedEntries = this.entries.filter(entry => entry.id !== entryId);
        this.entries = updatedEntries;
        this.entriesUpdated.next([...this.entries]);
      });
  }
}
