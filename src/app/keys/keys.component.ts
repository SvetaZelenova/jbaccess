import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';

import { Key } from './key'
import { KeysService } from './keys.service'
import {Person} from '../personnel/person';
@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  providers: [MessageService]
})
export class KeysComponent implements OnInit {
  keys: Key[];
  persons: Person[];
  displayCreateKeyDialog: boolean;
  newKeyForm: FormGroup;
  constructor(private keysService: KeysService, private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.loadKeysAndPersons();

    this.newKeyForm = this.formBuilder.group({
      keyName: ['', Validators.required],
      keyAccessKey: ['', Validators.required],
      keyPerson: [null, Validators.required]
    })
  }

  loadKeysAndPersons() {
    this.keysService.loadKeys().subscribe(k => {
      this.keys = k.keys;
      this.persons = k.persons;
    });
  }
  createKey() {
    const key: Key = {
      id: 0,
      person: this.newKeyForm.value['keyPerson'],
      name: this.newKeyForm.value['keyName'],
      accessKey: this.newKeyForm.value['keyAccessKey']
    };
    this.keysService.createKey(key).subscribe(
      d => { this.displayCreateKeyDialog = false; this.keys.push(d) },
      error => console.log('error from handler --->', error));
  }

}
