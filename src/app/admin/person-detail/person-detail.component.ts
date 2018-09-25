import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import {PersonInDto, PersonnelService, PersonOutDto} from "@anatolyua/jbaccess-client-open-api";
import { Location} from "@angular/common";
import {User} from "../user.model";

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  public user = {} as User;
  constructor(private ps: PersonnelService,
              private route: ActivatedRoute,
              private location: Location) { }



  ngOnInit() {
    this.getUser()
  }
  getUser() {
    const personId = +this.route.snapshot.paramMap.get('id');
    this.ps.getPerson(personId)
      .subscribe(data => {
        this.user = <PersonOutDto>data.payload;
        console.log(this.user)
      })
  }
  backToTable() {
    this.location.back()
  }
}
