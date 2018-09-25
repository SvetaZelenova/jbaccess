import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonService} from "../personnel.service";
import {User} from "../user.model";

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  persons : User[];
  newUserForm: FormGroup;
  constructor( private ps: PersonService, private fb:FormBuilder) {

  }

  ngOnInit() {
    this.loadPersonnel()

    this.newUserForm = this.fb.group({
      userName: ['', Validators.required]
    });
  }

  displayAddPersonDialog: boolean = false;

  loadPersonnel() {
    this.ps.getAllPersonnel()
      .subscribe(data => {
        this.persons = <User[]> data.payload;
        console.log(data);
      });
  }
  addPersonDialogOpen() {
    this.displayAddPersonDialog = true;
  };
  addPersonDialogClose() {
    this.displayAddPersonDialog = false;
  }

  onSubmit() {
    let name = this.newUserForm.value['userName'];
    this.ps.createPerson({name} as User)
      .subscribe(
        () => {
          this.loadPersonnel()
          this.addPersonDialogClose()
        },

        error => console.log('Error!', error)
      )
  }

  deleteUser(id) {
    this.ps.deletePerson(id)
      .subscribe(
        () => {
          this.loadPersonnel()
        }
      )
  }
}
