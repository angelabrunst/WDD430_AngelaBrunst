import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {}

  getMessages(): Message[] {
    this.http
      .get('https://cms-project-7478d-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort();
          this.messageChangedEvent.next(this.messages.slice());
        }, 
        (error: any) => {
          console.log(error.message);
        }
      );
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    if (!this.messages) {
      return null;
    }

    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }

    return null;
  }

  getMaxId(): number {
    let maxId: number = 0;
  
    for (let message of this.messages) {
      let currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    
    return maxId;
    }
  }

  storeMessages() {
    const json = JSON.stringify(this.messages);
    this.http.put(
      'https://cms-project-7478d-default-rtdb.firebaseio.com/messages.json', 
      json, 
      {
        headers: new HttpHeaders({'Content-Type':'application/json'})
      }
    ). subscribe(() => {
      this.messageChangedEvent.emit(this.messages.slice());
    })
  }

  addMessage(message: Message) {
    this.messages.push(message);
    // this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }
}
