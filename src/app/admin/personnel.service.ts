import { Injectable } from '@angular/core';
import { PersonnelService, AllPersonnelResponse, AllPersonnelResponsePayload, ServiceObject, PersonOutDto } from  '@anatolyua/jbaccess-client-open-api';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private externalPersonnelService: PersonnelService) { }

  getAllPersonnel() {
    return this.externalPersonnelService.getAllPersonnel()
  }
  createPerson(name) {
    return this.externalPersonnelService.createPerson(name)
  }
  deletePerson(id) {
    return this.externalPersonnelService.deletePerson(id)
  }
}
