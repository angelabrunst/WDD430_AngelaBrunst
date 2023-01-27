import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Document } from '../../document.model';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent {
  @Input() document: Document;
  @Output() selectedDocument = new EventEmitter<void>();

  onSelected() {
    this.selectedDocument.emit();
  }

}
