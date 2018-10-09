import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {Controller} from "../common.interfaces";
import {ControllersService} from "./controllers.service";

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.scss']
})
export class ControllersComponent implements OnInit {

  controllers: Controller[];
  controllerForm: FormGroup;
  submitted: boolean = false;
  isRefreshing: boolean = false;
  displayControllerDialog: boolean = false;

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

  loadControllers(showMessage: boolean = true) {
    this.isRefreshing = true;
    this.controllersService.getAllControllers()
      .subscribe(data => {
        this.controllers = data.controllers;
        this.isRefreshing = false;
        if (!showMessage) {
          return;
        }
        this.messageService.add({
          severity: 'info',
          summary: 'Controllers table refreshed'})
      });
  }
  displayControllerForm(controller? : Controller) {
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
      .subscribe( controller => {
          this.loadControllers(false);
          this.hideControllerForm();
          this.messageService.add({
            severity: 'info',
            summary: `Controller '${controller.name}' successfully created`
          })
        },
        error => console.log('Error!', error))
  }

  updateController(controller: Controller) {
    this.controllersService.updateController(controller)
      .subscribe(controller => {
          this.loadControllers(false);
          this.hideControllerForm();
          this.messageService.add({
            severity: 'info',
            summary: `Controller '${controller.name}' successfully updated`
          })
        },
        error => console.log('Error!', error))
  }

  deleteController(id: number) {
    const controller = this.controllers.find(c => c.id === id)
    this.confirmationService.confirm({
      message: `Are you shure want to delete controller '${controller.name}'`,
      accept:() => {
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
