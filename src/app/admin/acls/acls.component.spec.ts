import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AclsComponent } from './acls.component';

describe('AclsComponent', () => {
  let component: AclsComponent;
  let fixture: ComponentFixture<AclsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AclsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AclsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
