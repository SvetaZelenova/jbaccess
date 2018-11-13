import { TestBed, inject } from '@angular/core/testing';

import { AclsService } from './acls.service';

describe('AclsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AclsService]
    });
  });

  it('should be created', inject([AclsService], (service: AclsService) => {
    expect(service).toBeTruthy();
  }));
});
