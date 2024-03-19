import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsUpdateComponent } from './organizations-update.component';

describe('OrganizationsUpdateComponent', () => {
  let component: OrganizationsUpdateComponent;
  let fixture: ComponentFixture<OrganizationsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationsUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
