import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit{
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') textInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = 'Angela Brunst';

  constructor(private messageService: MessageService){}

  ngOnInit() {
      
  }

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const text = this.textInputRef.nativeElement.value;
    const sender = this.currentSender;
    const id: string = "1";

    const newMessage = new Message(id, subject, text, sender);

    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.textInputRef.nativeElement.value = '';
  }
}
