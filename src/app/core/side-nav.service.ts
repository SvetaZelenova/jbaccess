import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  showNaw = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  toggle() {
    this.showNaw = !this.showNaw;
    this.change.emit(this.showNaw)
  }
}
