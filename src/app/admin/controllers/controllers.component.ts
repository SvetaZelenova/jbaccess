import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Controller} from '../common.interfaces';
import {ControllersService} from './controllers.service';
import {Relation} from '../../shared/relations/relations.component';

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.scss']
})
export class ControllersComponent implements OnInit {

  controllers: Controller[];
  doors: Relation[];
  controllerForm: FormGroup;
  submitted = false;
  isRefreshing = false;
  displayControllerDialog = false;
  displayDoorsRelations = false;
  currentController: Controller;
  doorsFormTitle: string;

  constructor(private controllersService: ControllersService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.loadControllers(false)

    this.controllerForm = this.formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      controllerId: ['', Validators.required]
    });
  }

  editDoors(controller: Controller) {
    this.currentController = controller;
    this.doorsFormTitle = `Doors for ${controller.name}`;
    this.doors = [];
    this.controllersService.getDoorsRelationsByControllerId(controller.id)
      .subscribe( rel => {
        this.doors = rel;
      });
    this.displayDoorsRelations = true;
  }
  updateDoorRelation(newRelation: Relation) {
    this.controllersService.updateDoorRelation(newRelation)
      .subscribe(
        () => this.messageService.add({
          severity: 'info',
          summary: `Door ${newRelation.connected ? 'added' : 'removed'}`,
          detail: `Door ${newRelation.relatedEntityDisplayName}
            ${newRelation.connected ? 'added' : 'removed'}
            to ${this.currentController.name}`
        }),
        () => { this.displayDoorsRelations = false; });
  }
  loadControllers(showMessage: boolean = true) {
    this.isRefreshing = true;
    this.controllersService.getAllControllers()
      .subscribe(data => {
        this.controllers = data;
        this.isRefreshing = false;
        if (!showMessage) {
          return;
        }
        this.messageService.add({
          severity: 'info',
          summary: 'Controllers table refreshed'})
      });
  }
  displayControllerForm(controller?: Controller) {
    this.submitted = false;
    const controllerForm = controller ? controller : {id: 0, name: '', controllerId: ''};
    this.controllerForm.reset(controllerForm);
    this.displayControllerDialog = true;
  }
  hideControllerForm() {
    this.displayControllerDialog = false;
  }
  submitController() {
    this.submitted = true;
    const controller = this.controllerForm.value as Controller;
    if (!this.controllerForm.valid) {
      return
    }
    if (controller.id === 0 ) {
      this.createController(controller)
    } else {
      this.updateController(controller)
    }
  }
  createController(controller: Controller) {
    this.controllersService.createController(controller)
      .subscribe( updatedController => {
          this.loadControllers(false);
          this.hideControllerForm();
          this.messageService.add({
            severity: 'info',
            summary: `Controller '${updatedController.name}' successfully created`
          })
        },
        error => console.log('Error!', error))
  }

  updateController(controller: Controller) {
    this.controllersService.updateController(controller)
      .subscribe(updatedController => {
          this.loadControllers(false);
          this.hideControllerForm();
          this.messageService.add({
            severity: 'info',
            summary: `Controller '${updatedController.name}' successfully updated`
          })
        },
        error => console.log('Error!', error))
  }

  deleteController(id: number) {
    const controller = this.controllers.find(c => c.id === id)
    this.confirmationService.confirm({
      message: `Are you shure want to delete controller '${controller.name}'`,
      accept: () => {
        this.controllersService.deleteController(id)
          .subscribe(() => {
              this.loadControllers(false);
              this.messageService.add({
                severity: 'info',
                summary: `Controller '${controller.name}' successfully removed`
              })
            },
            error => console.log(error))
      }
    });
  }

}
