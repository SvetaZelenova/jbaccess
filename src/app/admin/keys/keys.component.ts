import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { KeyViewModel } from './key.viewmodel'
import { KeysService } from './keys.service'
import {Person} from '../person';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html'
})
export class KeysComponent implements OnInit {
  keys: KeyViewModel[];
  persons: Person[];
  displayCreateKeyDialog: boolean;
  keyForm: FormGroup;
  submitted = false;
  constructor(
    private keysService: KeysService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private  confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.loadKeysAndPersons();

    this.keyForm = this.formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      accessKey: ['', Validators.required],
      person: [null, Validators.required]
    })
  }

  loadKeysAndPersons() {
    this.keysService.loadKeys().subscribe(k => {
      this.keys = k.keys;
      this.persons = k.persons;
    });
  }
  displayKeyForm(key?: KeyViewModel) {
    this.submitted = false;
    const formKey = key ? key : {id: 0, name: '', accessKey: '', person: null};
    this.keyForm.reset(formKey);
    this.displayCreateKeyDialog = true;
  }
  hideKeyForm() {
    this.displayCreateKeyDialog = false;
  }
  submitKeyForm() {
    this.submitted = true;
    const key = this.keyForm.value as KeyViewModel;
    key.personId = key.person.id;
    if (!this.keyForm.valid) {
      return;
    }
    if (key.id === 0) {
      this.createKey(key);
    } else {
      this.updateKey(key);
    }
  }
  createKey(key: KeyViewModel) {
    this.keysService.createKey(key)
      .subscribe(newKey => {
        this.hideKeyForm();
        this.keys.push(newKey);
        this.messageService.add({
          severity: 'info',
          summary: `New key '${key.name}' successfully created`
        })
      });
  }
  updateKey(key: KeyViewModel) {
    this.keysService.updateKey(key)
      .subscribe(newKey => {
        this.hideKeyForm();
        this.keys.splice(this.keys.map(k => k.id).indexOf(newKey.id), 1, newKey);
        this.messageService.add({
          severity: 'info',
          summary: `Key with id='${key.id}' successfully updated`
        })
      });
  }
  deleteKey(id: number) {
    const key = this.keys.find(k => k.id === id);
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${key.id}: ${key.name} key?`,
      accept: () => {
        this.keysService.deleteKey(id)
          .subscribe( d => {
            this.keys.splice(this.keys.map(k => k.id).indexOf(id), 1);
            this.messageService.add({
              severity: 'info',
              summary: `Key with id='${d}' successfully removed`
            })
          })
      }
    });
  }

}
