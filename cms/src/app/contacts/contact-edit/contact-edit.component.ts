import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit{
  // @ViewChild('form') editForm: NgForm;

  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  contactInvalid: boolean = false;
  
  constructor(
      private contactService: ContactService,
      private router: Router,
      private route: ActivatedRoute) {
      }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (!this.id) {
            this.editMode = false;
            return;
          }

          this.originalContact = this.contactService.getContact(this.id.toString());

          if (!this.originalContact) {
            return;
          }

          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));

           if (this.contact['group']) {
             this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
           }
        }
      )    
  }
  
  onSubmit(f: NgForm) {
    const value = f.value;
    const newContact = new Contact(this.contactService.getMaxId().toString(), value.name, value.email, value.phone, value.imageUrl, this.groupContacts);

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact)
    } else {
      this.contactService.addContact(newContact);
    }

    this.editMode = false;
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
    this.contact.group.push(selectedContact);
    console.log(this.contact);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      this.contactInvalid = true;
      return true;
    }

    if (this.contact && newContact.id === this.contact.id) {
      this.contactInvalid = true;
       return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++){
       if (newContact.id === this.groupContacts[i].id) {
        this.contactInvalid = true;
        return true;
      }
    }

    this.contactInvalid = false;
    return false;
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
       return;
    }
    this.groupContacts.splice(index, 1);
    }
}
