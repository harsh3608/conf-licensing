import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedLicenseListComponent } from './approved-license-list.component';

describe('ApprovedLicenseListComponent', () => {
  let component: ApprovedLicenseListComponent;
  let fixture: ComponentFixture<ApprovedLicenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovedLicenseListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovedLicenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
