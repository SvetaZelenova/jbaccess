import { Component, OnInit } from '@angular/core';
import { Controller, Place } from '../common.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from './places.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Relation } from '../../shared/relations/relations.component';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  places: Place[];
  doors: Relation[];
  placeForm: FormGroup;
  submitted = false;
  isRefreshing = false;
  displayPlaceDialog = false;
  displayDoorsRelations = false;
  currentPlace: Place;
  doorsFormTitle: string;

  constructor(
    private placesService: PlacesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadPlaces(false);

    this.placeForm = this.formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required]
    });
  }
  editDoors(place: Place) {
    this.currentPlace = place;
    this.doorsFormTitle = `Doors for ${place.name}`;
    this.doors = [];
    this.placesService.getDoorsRelationsByPlaceId(place.id).subscribe(rel => {
      this.doors = rel;
    });
    this.displayDoorsRelations = true;
  }
  updateDoorRelation(newRelation: Relation) {
    this.placesService.updateDoorRelation(newRelation).subscribe(
      () =>
        this.messageService.add({
          severity: 'info',
          summary: `Door ${newRelation.connected ? 'added' : 'removed'}`,
          detail: `Door ${newRelation.relatedEntityDisplayName}
            ${newRelation.connected ? 'added' : 'removed'}
            to ${this.currentPlace.name}`
        }),
      () => {
        this.displayDoorsRelations = false;
      }
    );
  }
  loadPlaces(showMessage: boolean = true) {
    this.isRefreshing = true;
    this.placesService.getAllPlaces().subscribe(data => {
      this.places = data;
      this.isRefreshing = false;
      if (!showMessage) {
        return;
      }
      this.messageService.add({
        severity: 'info',
        summary: `Places table refreshed`
      });
    });
  }
  displayPlaceForm(place?: Place) {
    this.submitted = false;
    const placeForm = place ? place : { id: 0, name: '' };
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
    if (place.id === 0) {
      this.createPlace(place);
    } else {
      this.updatePlace(place);
    }
  }
  createPlace(place: Place) {
    this.placesService.createPlace(place).subscribe(
      updatedPlace => {
        this.loadPlaces(false);
        this.hidePlaceForm();
        this.messageService.add({
          severity: 'info',
          summary: `Ne place '${updatedPlace.name} successfully created`
        });
      },
      error => console.log('Error!', error)
    );
  }
  updatePlace(place: Place) {
    this.placesService.updatePlace(place).subscribe(updatedPlace => {
      this.loadPlaces(false);
      this.hidePlaceForm();
      this.messageService.add({
        severity: 'info',
        summary: `Place '${updatedPlace.name}' successfully updated`
      });
    });
  }

  deletePlace(id: number) {
    const place = this.places.find(p => p.id === id);
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${place.id}: ${place.name}?`,
      accept: () => {
        this.placesService.deletePlace(id).subscribe(
          d => {
            this.loadPlaces(false);
            this.messageService.add({
              severity: 'info',
              summary: `Place '${place.name}' successfully removed`
            });
          },
          error => console.log(error)
        );
      }
    });
  }
}
