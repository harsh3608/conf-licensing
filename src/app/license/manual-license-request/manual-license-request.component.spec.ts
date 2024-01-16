import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualLicenseRequestComponent } from './manual-license-request.component';

describe('ManualLicenseRequestComponent', () => {
  let component: ManualLicenseRequestComponent;
  let fixture: ComponentFixture<ManualLicenseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManualLicenseRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualLicenseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
