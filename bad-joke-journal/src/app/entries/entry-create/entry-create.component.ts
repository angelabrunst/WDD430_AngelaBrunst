import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-entry-create',
  templateUrl: './entry-create.component.html',
  styleUrls: ['./entry-create.component.css']
})
export class EntryCreateComponent {

  constructor(public entriesService: EntriesService) {}

  onAddEntry(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.entriesService.addEntry(form.value.joke, form.value.answer);
    form.resetForm();
  }
}
