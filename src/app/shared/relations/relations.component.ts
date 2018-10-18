import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

export interface Relation {
  parentId: number,
  relatedEntityId: number,
  relatedEntityDisplayName: string,
  connected: boolean,
  inProgress: boolean
}

@Component({
  selector: 'app-relations',
  template: `
    <div>
      <p-inputSwitch [(ngModel)]="relation.connected" (onChange)="handleChange(relation)"></p-inputSwitch>
      <label>{{ relation.relatedEntityDisplayName }}</label>
    </div>
  `,
  // templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.scss']
})
export class RelationsComponent implements OnInit {
  @Input() relation: Relation;
  @Output() updateRelation = new EventEmitter<Relation>();

  constructor() { }

  ngOnInit() {
  }
  handleChange(relation: Relation) {
    this.updateRelation.emit(relation);
  }


}
