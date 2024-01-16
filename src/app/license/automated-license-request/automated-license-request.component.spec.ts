import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatedLicenseRequestComponent } from './automated-license-request.component';

describe('AutomatedLicenseRequestComponent', () => {
  let component: AutomatedLicenseRequestComponent;
  let fixture: ComponentFixture<AutomatedLicenseRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomatedLicenseRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutomatedLicenseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
