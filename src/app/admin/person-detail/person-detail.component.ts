import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { Location} from "@angular/common";
import {Person} from "../common.interfaces";
import {PersonService} from "../personnel/personnel.service";

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  public person = {} as Person;
  constructor(private ps: PersonService,
              private route: ActivatedRoute,
              private location: Location) { }



  ngOnInit() {
    this.getPerson()
  }
  getPerson() {
    const personId = +this.route.snapshot.paramMap.get('id');
    this.ps.getPerson(personId)
      .subscribe(data => {
        this.person = data;
      })
  }
  backToTable() {
    this.location.back()
  }
}
