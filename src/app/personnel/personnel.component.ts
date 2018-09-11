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
    this.loadPersonnel()

    this.newUserForm = this.fb.group({
      userName: ['', Validators.required]
    });
  }
  displayAddPersonDialog: boolean = false;
  displayKeysListDialog: boolean = false;
  displayRolesListDialog: boolean = false;

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
    let name = this.newUserForm.value['userName'];
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
