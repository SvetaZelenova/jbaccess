import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import { PersonnelService } from './api/api/personnel.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  items: MenuItem[];

  constructor(private personnelService: PersonnelService) {

    personnelService
      .getAllPersonnel()
      .subscribe(console.log);
  }

  ngOnInit() {
    this.items = [{
      label: 'Menu',
      items: [
        {label: 'Personnel', icon: 'fa fa-plus', routerLink: ['/']},
        {label: 'Places', icon: 'fa fa-download', routerLink: ['/places']},
        {label: 'Doors', icon: 'fa fa-download'}
      ]
    }]
  }
}
