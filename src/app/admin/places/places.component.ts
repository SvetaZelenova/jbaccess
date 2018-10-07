import { Component, OnInit } from '@angular/core';
import {Place} from "../common.interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlacesService} from "./places.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  places: Place[];
  placeForm: FormGroup;
  submitted: boolean = false;
  isRefreshing: boolean = false;
  displayPlaceDialog: boolean = false;

  constructor(private placesService: PlacesService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.loadPlaces(false);

    this.placeForm = this.formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required]
    })
  }

  loadPlaces(showMessage: boolean = true) {
    this.isRefreshing = true;
    this.placesService.getAllPlaces()
      .subscribe(data => {
        this.places = data.places;
        this.isRefreshing = false;
        if (!showMessage) {
          return;
        }
        this.messageService.add({
          severity: 'info',
          summary: `Places table refreshed`
        })
      })
  }
  displayPlaceForm(place?: Place) {
    this.submitted = false;
    const placeForm = place ? place : {id: 0, name: ''};
    this.placeForm.reset(placeForm);
    this.displayPlaceDialog = true;
  }
  hidePlaceForm() {
    this.displayPlaceDialog = false;
  }
  submitPlace() {
    this.submitted = true;
    const place = this.placeForm.value as Place;
    if (!this.placeForm.valid) {
      return;
    }
    if (place.id === 0 ) {
      this.createPlace(place)
    } else {
      this.updatePlace(place)
    }
  }
  createPlace(place: Place) {
    this.placesService.createPlace(place)
      .subscribe( place => {
        this.loadPlaces(false);
        this.hidePlaceForm();
        this.messageService.add({
          severity: 'info',
          summary: `Ne place '${place.name} successfully created`
        })
      },
        error => console.log('Error!', error))
  }
  updatePlace(place: Place) {
    this.placesService.updatePlace(place)
      .subscribe(place => {
        this.loadPlaces(false);
        this.hidePlaceForm();
        this.messageService.add({
          severity: 'info',
          summary: `Place '${place.name}' successfully updated`
        })
      })
  }

  deletePlace(id: number) {
    const place = this.places.find(p => p.id === id);
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${place.id}: ${place.name}?`,
      accept: () => {
        this.placesService.deletePlace(id)
          .subscribe( d => {
              this.loadPlaces(false);
              this.messageService.add({
                severity: 'info',
                summary: `Place '${place.name}' successfully removed`
              })
            },
            error => console.log(error)
          )}
    });
  }

}
