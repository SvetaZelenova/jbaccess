import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  items: MenuItem[]
  constructor() { }

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
