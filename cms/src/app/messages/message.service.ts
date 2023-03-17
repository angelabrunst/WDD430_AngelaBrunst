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
    this.http.get('http://localhost:3000/messages')
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages
        this.maxMessageId = this.getMaxId();
        this.messages.sort();
        this.messageChangedEvent.emit(this.messages.slice());
      }, 
      (error: any) => {
        console.log(error.message);
      }
    )
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
    if (!message) {
      return;
    }
  
    // make sure id of the new Document is empty
    message.id = '';
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // add to database
    this.http.post<{ message: string, newMessage: Message }>('http://localhost:3000/messages',
      message, { headers: headers })
      .subscribe(
        (responseData) => {
          console.log(responseData.message);
          // add new document to documents
          this.messages.push(responseData.newMessage);
          this.messages.sort();
          this.messageChangedEvent.next(this.messages.slice());
        }
      );
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }
  
    const pos = this.messages.findIndex(d => d.id === originalMessage.id);
  
    if (pos < 0) {
      return;
    }
  
    // set the id of the new Document to the id of the old Document
    newMessage.id = newMessage.id;
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // update database
    this.http.put('http://localhost:3000/messages/' + originalMessage.id,
      newMessage, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.messages[pos] = newMessage;
          this.messages.sort();
          this.messageChangedEvent.next(this.messages.slice());
        }
      );
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }
  
    const pos = this.messages.findIndex(d => d.id === message.id);
    if (pos < 0) {
      return;
    }
  
    // delete from database
    this.http.delete('http://localhost:3000/messages/' + message.id)
      .subscribe(
        (response: Response) => {
          this.messages.splice(pos, 1);
          this.messages.sort();
          this.messageChangedEvent.next(this.messages.slice());
        }
      );
  }

}
