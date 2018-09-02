import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  items: MenuItem[];

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
