import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, 'Week 4 Assignment', 'Learning many new things that are important.', 'https://my.byui.edu/ICS/', null),
    new Document(1, 'Week 5 Assignment', 'Learning many new things that are important.', 'https://my.byui.edu/ICS/', null),
    new Document(1, 'Week 6 Assignment', 'Learning many new things that are important.', 'https://my.byui.edu/ICS/', null),
    new Document(1, 'Week 7 Assignment', 'Learning many new things that are important.', 'https://my.byui.edu/ICS/', null),
    new Document(1, 'Week 8 Assignment', 'Learning many new things that are important.', 'https://my.byui.edu/ICS/', null),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
    console.log("this works");
  }
}
