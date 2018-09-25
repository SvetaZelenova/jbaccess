import { Component, OnInit } from '@angular/core';
import { PersonnelService, PersonOutDto } from '@anatolyua/jbaccess-client-open-api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html'
})
export class PersonnelComponent implements OnInit {

  persons: PersonOutDto[];
  newUserForm: FormGroup;

  displayAddPersonDialog = false;

  constructor( private ps: PersonnelService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.loadPersonnel()

    this.newUserForm = this.fb.group({
      userName: ['', Validators.required]
    });
  }





  loadPersonnel() {
    this.ps.getAllPersonnel()
      .subscribe(data => {
        this.persons = <PersonOutDto[]> data.payload;
        console.log(data);
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
          this.loadPersonnel()
          this.addPersonDialogClose()
        },

        error => console.log('Error!', error)
      )
  }
}
