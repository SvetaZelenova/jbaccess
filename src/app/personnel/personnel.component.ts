import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonnelService, PersonOutDto } from '@anatolyua/jbaccess-client-open-api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {environment} from '../../environments/environment';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html'
})
export class PersonnelComponent implements OnInit {

  persons: PersonOutDto[];
  newUserForm: FormGroup;
  baseUrl: string;

  displayAddPersonDialog = false;

  constructor( private ps: PersonnelService, private fb: FormBuilder, private http: HttpClient) {
    this.baseUrl = environment.API_BASE_PATH + '/person';
  }

  ngOnInit() {
    this.loadPersonnel()

    this.newUserForm = this.fb.group({
      userName: ['', Validators.required]
    });
  }





  loadPersonnel() {
    this.http.get<any>(this.baseUrl)
      .subscribe(data => {
        console.log(data);
        this.persons = <PersonOutDto[]> data.payload;
      });
  }
  addPersonDialogOpen() {
    this.displayAddPersonDialog = true;
  };
  addPersonDialogClose() {
    this.displayAddPersonDialog = false;
  }
  deletePerson(id: number) {
    this.ps.deletePerson(id).subscribe(
      () => this.loadPersonnel(),
      error => console.log(error)
    )
  }

  onSubmit() {
    const name = this.newUserForm.value['userName'];
    this.ps.createPerson({name} as PersonOutDto)
      .subscribe(
        () => {
          this.loadPersonnel();
          this.addPersonDialogClose()
        },

        error => console.log('Error!', error)
      )
  }
}
