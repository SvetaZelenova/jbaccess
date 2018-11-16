import { Component, OnInit } from '@angular/core';

import { AclsService, AclTarget, AclType } from './acls.service';
import { PersonService } from '../personnel/personnel.service';
import { RolesService } from '../roles/roles.service';
import { Acl, Controller, Person, Place, Role } from '../common.interfaces';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { PlacesService } from '../places/places.service';
import { AclsForPlace } from './acls-for-place';
import { ControllersService } from '../controllers/controllers.service';
import { getButtonFromEvent } from '../../shared/button-from-event';

export interface Target {
  targetType: AclTarget;
  targetId: number;
  item: Role | Person;
}

@Component({
  selector: 'app-acls',
  templateUrl: './acls.component.html',
  styleUrls: ['./acls.component.scss']
})
export class AclsComponent implements OnInit {
  ACL_TYPE: typeof AclType = AclType;
  currentTarget: Target;
  personsAndRoles: SelectItemGroup[];
  places: Place[] = [];
  aclsByPlace: Array<AclsForPlace> = [];
  controllers: SelectItem[] = [];
  selectedController: Controller;
  displayResolveAcls = false;
  resolveResult: string;

  constructor(
    private aclsService: AclsService,
    private controllersService: ControllersService,
    private personService: PersonService,
    private placesService: PlacesService,
    private rolesService: RolesService
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.getPersonsAndRoles();
    this.getPlaces();
    this.getControllers();
  }

  getControllers() {
    this.controllersService.getAllControllers().subscribe(
      data => {
        data.forEach(c => {
          this.controllers.push({
            label: c.name,
            value: c
          });
        });
      },
      error => {}
    );
  }

  onControllerSelected(controller: Controller) {
    this.resolveResult = '';
    this.aclsService.resolveAcls(controller.controllerId).subscribe(
      data => {
        this.resolveResult = JSON.stringify(data, null, 2);
      },
      error => {}
    );
  }

  getPlaces() {
    this.placesService.getAllPlaces().subscribe(
      data => {
        this.places = data;
        this.clearAclsByPlace();
      },
      error => {}
    );
  }

  getPersonsAndRoles() {
    zip(this.personService.getAllPersonnel(), this.rolesService.getAllRoles())
      .pipe(
        map(data => {
          const persons = data[0];
          const roles = data[1];
          this.personsAndRoles = [
            {
              label: 'ROLES',
              items: roles.map(r => {
                return {
                  label: r.name,
                  value: {
                    targetType: AclTarget.Role,
                    targetId: r.id,
                    item: r
                  }
                };
              })
            },
            {
              label: 'PERSONS',
              items: persons.map(p => {
                return {
                  label: p.name,
                  value: {
                    targetType: AclTarget.Person,
                    targetId: p.id,
                    item: p
                  }
                };
              })
            }
          ];
        })
      )
      .subscribe();
  }

  clearAclsByPlace() {
    this.places.forEach(p => {
      this.aclsByPlace[p.id] = new AclsForPlace();
    });
  }

  onTargetSelected(target: Target) {
    this.clearAclsByPlace();
    this.aclsService.getAcls(target.targetType, target.targetId).subscribe(
      data => {
        data.forEach(p => {
          if (p.type === AclType.Allow) {
            this.aclsByPlace[p.placeId].allow = p;
          } else {
            this.aclsByPlace[p.placeId].disallow = p;
          }
        });
        console.log(this.aclsByPlace);
      },
      error => {}
    );
  }

  addAcl(target: Target, placeId: number, aclType: AclType, e: Event) {
    const button = getButtonFromEvent(e);
    button.disabled = true;
    this.aclsService
      .addAcl(target.targetType, aclType, target.targetId, placeId)
      .subscribe(
        acl => {
          this.aclsByPlace[acl.placeId].add(acl);
          button.disabled = false;
        },
        error1 => {
          button.disabled = false;
        }
      );
  }

  deleteAcl(acl: Acl, e: Event) {
    const button = getButtonFromEvent(e);
    button.disabled = true;
    this.aclsService.deleteAcl(acl.id).subscribe(
      data => {
        this.aclsByPlace[acl.placeId].remove(acl.id);
        button.disabled = false;
      },
      error => {
        button.disabled = false;
      }
    );
  }
}
