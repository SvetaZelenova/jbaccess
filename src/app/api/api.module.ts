import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { ACLsService } from './api/aCLs.service';
import { AclResolvingService } from './api/aclResolving.service';
import { ControllersService } from './api/controllers.service';
import { DoorsService } from './api/doors.service';
import { KeysService } from './api/keys.service';
import { PersonnelService } from './api/personnel.service';
import { PlacesService } from './api/places.service';
import { RolesService } from './api/roles.service';
import { SecurityService } from './api/security.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    ACLsService,
    AclResolvingService,
    ControllersService,
    DoorsService,
    KeysService,
    PersonnelService,
    PlacesService,
    RolesService,
    SecurityService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
