import { Component, OnInit } from '@angular/core';
import {Door} from "../common.interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DoorsService} from "./doors.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.scss']
})
export class DoorsComponent implements OnInit {

  doors: Door[];
  doorForm: FormGroup;
  submitted: boolean = false;
  isRefreshing: boolean = false;
  displayDoorDialog: boolean = false;

  constructor(private doorsService: DoorsService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.loadDoors(false)

    this.doorForm = this.formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      accessId: ['', Validators.required]
    });
  }

  loadDoors(showMessage: boolean = true) {
    this.isRefreshing = true;
    this.doorsService.getAllDoors()
      .subscribe(data => {
        this.doors = data.doors;
        this.isRefreshing = false;
        if (!showMessage) {
          return;
        }
        this.messageService.add({
          severity: 'info',
          summary: 'Doors table refreshed'})
      });
  }
  displayDoorForm(door? : Door) {
    this.submitted = false;
    const doorForm = door ? door : {id: 0, name: '', accessId: ''};
    this.doorForm.reset(doorForm);
    this.displayDoorDialog = true;
  }
  hideDoorForm() {
    this.displayDoorDialog = false;
  }
  submitDoor() {
    this.submitted = true;
    const door = this.doorForm.value as Door;
    if (!this.doorForm.valid) {
      return
    }
    if (door.id === 0 ) {
      this.createDoor(door)
    } else {
      this.updateDoor(door)
    }
  }
  createDoor(door: Door) {
    this.doorsService.createDoor(door)
      .subscribe( door => {
        this.loadDoors(false);
        this.hideDoorForm();
        this.messageService.add({
          severity: 'info',
          summary: `Door '${door.name}' successfully created`
        })
      },
        error => console.log('Error!', error))
  }

  updateDoor(door: Door) {
    this.doorsService.updateDoor(door)
      .subscribe(door => {
        this.loadDoors(false);
        this.hideDoorForm();
        this.messageService.add({
          severity: 'info',
          summary: `Door '${door.name}' successfully updated`
        })
      },
        error => console.log('Error!', error))
  }

  deleteDoor(id: number) {
    const door = this.doors.find(d => d.id === id)
    this.confirmationService.confirm({
      message: `Are you shure want to delete door '${door.name}'`,
      accept:() => {
        this.doorsService.deleteDoor(id)
          .subscribe(() => {
            this.loadDoors(false);
            this.messageService.add({
              severity: 'info',
              summary: `Door '${door.name}' successfully removed`
            })
          },
            error => console.log(error))
      }
    });
  }

}
