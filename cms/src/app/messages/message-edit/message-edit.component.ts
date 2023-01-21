import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') textInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = 'Angela Brunst';

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const text = this.textInputRef.nativeElement.value;
    const sender = this.currentSender;

    const newMessage = new Message(3, subject, text, sender);

    this.addMessageEvent.emit(newMessage)
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.textInputRef.nativeElement.value = '';
  }
}
