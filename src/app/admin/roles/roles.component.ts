import { Component, OnInit } from '@angular/core';
import { Role } from '../common.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from './roles.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles: Role[];
  roleForm: FormGroup;
  isRefreshing: boolean = false;
  submitted: boolean = false;
  displayRoleDialog: boolean = false;

  constructor(
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadRoles(false);

    this.roleForm = this.formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required]
    });
  }
  loadRoles(showMessage: boolean = true) {
    this.isRefreshing = true;
    this.rolesService.getAllRoles().subscribe(data => {
      this.roles = data.roles;
      this.isRefreshing = false;
      if (!showMessage) {
        return;
      }
      this.messageService.add({
        severity: 'info',
        summary: 'Roles table refreshed'
      });
    });
  }
  displayRoleForm(role?: Role) {
    this.submitted = false;
    const roleForm = role ? role : { id: 0, name: '' };
    this.roleForm.reset(roleForm);
    this.displayRoleDialog = true;
  }
  hideRoleForm() {
    this.displayRoleDialog = false;
  }
  submitRole() {
    this.submitted = true;
    const role = this.roleForm.value as Role;
    if (!this.roleForm.valid) {
      return;
    }
    if (role.id === 0) {
      this.createRole(role);
    } else {
      this.updateRole(role);
    }
  }
  createRole(role: Role) {
    this.rolesService.createRole(role).subscribe(
      role => {
        this.loadRoles(false);
        this.hideRoleForm();
        this.messageService.add({
          severity: 'info',
          summary: `Role '${role.name}' successfully created`
        });
      },
      error => console.log(error)
    );
  }
  updateRole(role: Role) {
    this.rolesService.updateRole(role).subscribe(
      role => {
        this.loadRoles(false);
        this.hideRoleForm();
        this.messageService.add({
          severity: 'info',
          summary: `Role '${role.name}' successfully updated`
        });
      },
      error => console.log(error)
    );
  }
  deleteRole(id: number) {
    const role = this.roles.find(r => r.id === id);
    this.confirmationService.confirm({
      message: `Are you shure want to delete role '${role.name}'`,
      accept: () => {
        this.rolesService.deleteRole(id).subscribe(
          () => {
            this.loadRoles(false);
            this.messageService.add({
              severity: 'info',
              summary: `Role '${role.name}' successfully removed`
            });
          },
          error => console.log(error)
        );
      }
    });
  }
}
