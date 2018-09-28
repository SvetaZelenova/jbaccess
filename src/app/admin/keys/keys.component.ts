import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { KeyViewModel } from './key.viewmodel'
import { KeysService } from './keys.service'
import {Person} from '../person';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html'
})
export class KeysComponent implements OnInit {
  keys: KeyViewModel[];
  persons: Person[];
  displayCreateKeyDialog: boolean;
  newKeyForm: FormGroup;
  constructor(private keysService: KeysService, private formBuilder: FormBuilder) { }

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
    const person = this.newKeyForm.value['keyPerson'] as Person;
    const key: KeyViewModel = {
      id: 0,
      person: person,
      personId: person.id,
      name: this.newKeyForm.value['keyName'],
      accessKey: this.newKeyForm.value['keyAccessKey']
    };
    this.keysService.createKey(key).subscribe(d => { this.displayCreateKeyDialog = false; this.keys.push(d) });
  }

}
