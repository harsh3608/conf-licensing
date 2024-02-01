import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowGeneratedLicenseComponent } from './show-generated-license.component';

describe('ShowGeneratedLicenseComponent', () => {
  let component: ShowGeneratedLicenseComponent;
  let fixture: ComponentFixture<ShowGeneratedLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowGeneratedLicenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowGeneratedLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
