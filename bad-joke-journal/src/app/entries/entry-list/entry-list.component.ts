import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { EntriesService } from '../entries.service';
import { Entry } from '../entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit, OnDestroy {
  entries: Entry[] = [];
  private entriesSub: Subscription;

  constructor(public entriesService: EntriesService) {}

  ngOnInit() {
    this.entriesService.getEntries();
    this.entriesSub = this.entriesService.getEntriesUpdateListener()
      .subscribe((entries: Entry[]) => {
        this.entries = entries;
      });
  }

  onDelete(entryId: string) {
    this.entriesService.deleteEntry(entryId);
  }

  ngOnDestroy() {
      this.entriesSub.unsubscribe();
  }
}


