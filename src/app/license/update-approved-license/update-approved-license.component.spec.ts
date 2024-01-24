import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApprovedLicenseComponent } from './update-approved-license.component';

describe('UpdateApprovedLicenseComponent', () => {
  let component: UpdateApprovedLicenseComponent;
  let fixture: ComponentFixture<UpdateApprovedLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateApprovedLicenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateApprovedLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
