import { Component, OnInit } from '@angular/core';
import { AccessDataService } from "../access-data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { IPerson } from "../access";

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  newUserForm: FormGroup;

  public personnel: IPerson [];

  constructor(private _accessDataService: AccessDataService, private fb:FormBuilder) {}



  ngOnInit() {
    this._accessDataService.getPersonData()
        .subscribe(data =>
          this.personnel = data
        );
    this.newUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
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
