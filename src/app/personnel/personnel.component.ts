import { Component, OnInit } from '@angular/core';
import { PersonnelService, AllPersonnelResponse, AllPersonnelResponsePayload, ServiceObject, PersonOutDto } from  '@anatolyua/jbaccess-client-open-api';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  persons : PersonOutDto[];
  cols: any[];

  constructor( private ps: PersonnelService ) { 
    
  }

  ngOnInit() {
    this.ps.getAllPersonnel()
      .subscribe(data => {
        this.persons = <PersonOutDto[]> data.payload;
        console.log(data);
      });

      this.cols = [
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'Name' }
    ];
  }

}
