import { Component } from '@angular/core';

@Component({
  selector: 'app-entry-create',
  templateUrl: './entry-create.component.html',
  styleUrls: ['./entry-create.component.css']
})
export class EntryCreateComponent {
  enteredValue = '';
  newEntry = 'Test';

  onAddEntry() {
    this.newEntry = this.enteredValue;
  }
}
