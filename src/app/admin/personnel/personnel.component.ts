import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from './personnel.service';
import { Person, Place } from '../common.interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Relation } from '../../shared/relations/relations.component';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {
  persons: Person[];
  currentPerson: Person;
  rolesPersonRelations: Relation[];
  newUserForm: FormGroup;
  submitted = false;
  isRefreshing = false;
  displayAddPersonDialog = false;
  displayRolesRelations = false;
  rolesFormTitle = '';

  constructor(
    private personService: PersonService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadPersonnel(false);

    this.newUserForm = this.formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required]
    });
  }

  loadPersonnel(showMessage: boolean = true) {
    this.isRefreshing = true;
    this.personService.getAllPersonnel().subscribe(data => {
      this.persons = data;
      this.isRefreshing = false;
      if (!showMessage) {
        return;
      }
      this.messageService.add({
        severity: 'info',
        summary: `Persons table refreshed`
      });
    });
  }

  displayPersonDialog(person?: Person) {
    this.submitted = false;
    const personForm = person ? person : { id: 0, name: '' };
    this.newUserForm.reset(personForm);
    this.displayAddPersonDialog = true;
  }

  hidePersonDialog() {
    this.displayAddPersonDialog = false;
  }

  submitPerson() {
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
    this.personService.createPerson(person).subscribe(
      newPrson => {
        this.loadPersonnel(false);
        this.hidePersonDialog();
        this.messageService.add({
          severity: 'info',
          summary: `New person '${newPrson.name}' successfully created`
        });
      },

      error => this.hidePersonDialog()
    );
  }

  updatePerson(person: Person) {
    this.personService.updatePerson(person).subscribe(
      newPerson => {
        this.loadPersonnel(false);
        this.hidePersonDialog();
        this.messageService.add({
          severity: 'info',
          summary: `Person '${newPerson.name}' successfully updated`
        });
      },
      error => this.hidePersonDialog()
    );
  }

  deletePerson(id: number) {
    const person = this.persons.find(p => p.id === id);
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${person.id}: ${person.name}?`,
      accept: () => {
        this.personService.deletePerson(id).subscribe(
          d => {
            this.loadPersonnel(false);
            this.messageService.add({
              severity: 'info',
              summary: `Person '${person.name}' successfully removed`
            });
          },
          error => this.loadPersonnel(false)
        );
      }
    });
  }

  editRoles(person: Person) {
    this.currentPerson = person;
    this.rolesFormTitle = `Roles assigned to ${person.name}`;
    this.rolesPersonRelations = [];
    this.personService.getRolesRelationsByPersonId(person.id).subscribe(rel => {
      this.rolesPersonRelations = rel;
    });
    this.displayRolesRelations = true;
  }

  updateRolePersonRelation(newRelation: Relation) {
    this.personService.updateRolePersonRelation(newRelation).subscribe(
      () =>
        this.messageService.add({
          severity: 'info',
          summary: `Role ${newRelation.connected ? 'assigned' : 'removed'}`,
          detail: `Role ${newRelation.relatedEntityDisplayName}
            ${newRelation.connected ? 'assigned' : 'removed'}
            to ${this.currentPerson.name}`
        }),
      error => (this.displayRolesRelations = false)
    );
  }
}
