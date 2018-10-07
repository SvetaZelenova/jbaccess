import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonService} from './personnel.service';
import {Person} from "../common.interfaces";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  persons: Person[];
  newUserForm: FormGroup;
  submitted = false;
  isRefreshing = false;
  displayAddPersonDialog = false;

  constructor( private personService: PersonService,
               private formBuilder: FormBuilder,
               private messageService: MessageService,
               private  confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.loadPersonnel(false)

    this.newUserForm = this.formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required]
    });
  }

  loadPersonnel(showMessage: boolean = true) {
    this.isRefreshing = true;
    this.personService.getAllPersonnel()
      .subscribe(data => {
        this.persons = data.persons;
        this.isRefreshing = false;
        if (!showMessage) {
          return;
        }
        this.messageService.add({
          severity: 'info',
          summary: `Persons table refreshed`
        })
      });
  }
  displayPersonDialog(person?: Person) {
    this.submitted = false;
    const personForm = person ? person : {id: 0, name: ''};
    this.newUserForm.reset(personForm);
    this.displayAddPersonDialog = true;
  };
  hidePersonDialog() {
    this.displayAddPersonDialog = false;
  }
  submitPerson () {
    this.submitted = true;
    const person = this.newUserForm.value as Person;
    if (!this.newUserForm.valid) {
      return;
    }
    if (person.id === 0) {
      this.createPerson(person);
    } else {
      this.updatePerson(person);
    }
  }
  createPerson(person: Person) {
    this.personService.createPerson(person)
      .subscribe(
        person => {
          this.loadPersonnel(false);
          this.hidePersonDialog();
          this.messageService.add({
            severity: 'info',
            summary: `New person '${person.name}' successfully created`
          })
        },

        error => console.log('Error!', error)
      )
  }
  updatePerson(person: Person) {
    this.personService.updatePerson(person)
      .subscribe(person => {
        this.loadPersonnel(false);
        this.hidePersonDialog();
        this.messageService.add({
          severity: 'info',
          summary: `Person '${person.name}' successfully updated`
        })
      })
  }
  deletePerson(id: number) {
    const person = this.persons.find(p => p.id === id);
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${person.id}: ${person.name}?`,
      accept: () => {
        this.personService.deletePerson(id)
          .subscribe( d => {
            this.loadPersonnel(false);
            this.messageService.add({
              severity: 'info',
              summary: `Person '${person.name}' successfully removed`
            })
          },
            error => console.log(error)
          )}
    });
  }
}
