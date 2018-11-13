import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Key, Person, Role } from '../../common.interfaces';
import { PersonService } from '../personnel.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  public person = {} as Person;
  keys: Key[];
  roles: Role[];
  personId = +this.route.snapshot.paramMap.get('id');

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getPerson();
    this.getKeysList();
    this.getRolesList();
  }
  getPerson() {
    this.personService.getPerson(this.personId).subscribe(data => {
      this.person = data;
    });
  }
  getKeysList() {
    this.personService.getPersonKeys(this.personId).subscribe(data => {
      this.keys = data.keys;
    });
  }
  getRolesList() {
    this.personService.getPersonRoles(this.personId).subscribe(data => {
      this.roles = data.roles;
    });
  }
  switchChange(personId, roleId, e) {
    if (e.checked) {
      this.personService.attachRoleToPerson(personId, roleId).subscribe(() => {
        console.log('Role attached');
      });
    } else {
      this.personService
        .detachRoleFromPerson(personId, roleId)
        .subscribe(() => {
          console.log('Role detached');
        });
    }
  }
  backToTable() {
    this.location.back();
  }
}
