import { Component, OnInit } from '@angular/core';
import { PersonnelService, AllPersonnelResponse, AllPersonnelResponsePayload, ServiceObject, PersonOutDto } from  '@anatolyua/jbaccess-client-open-api';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  persons : PersonOutDto[];
  cols: any[];
  newUserForm: FormGroup;
  constructor( private ps: PersonnelService, private fb:FormBuilder) {

  }

  ngOnInit() {
    this.ps.getAllPersonnel()
      .subscribe(data => {
        this.persons = <PersonOutDto[]> data.payload;
        console.log(data);
      });
    this.newUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.cols = [
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'Name' }
    ];
  }
  displayAddPersonDialog: boolean = false;
  displayKeysListDialog: boolean = false;
  displayRolesListDialog: boolean = false;

  addPersonDialogOpen() {
    this.displayAddPersonDialog = true;
  };
  openKeysList() {
    this.displayKeysListDialog = true;
  };
  openRolesList() {
    this.displayRolesListDialog = true;
  };
  closeKeysList() {
    this.displayKeysListDialog = false;
  };
  closeRolesList() {
    this.displayRolesListDialog = false;
  };

  onSubmit() {
    let name = this.newUserForm.value['firstName'] + ' ' + this.newUserForm.value['lastName'];
    this._accessDataService.addPersonName({name} as IPerson)
      .subscribe(
        data => console.log('Succes!', data),
        error => console.log('Error!', error)
      )
  }
}
