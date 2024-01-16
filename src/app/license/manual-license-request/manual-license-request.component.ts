import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LicenseManualRequest } from '../shared/models/license-models';

@Component({
  selector: 'app-manual-license-request',
  templateUrl: './manual-license-request.component.html',
  styleUrl: './manual-license-request.component.css'
})
export class ManualLicenseRequestComponent implements OnInit {
  ManualRequestForm!: FormGroup;
  licenseManualRequest!: LicenseManualRequest;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {


    this.ManualRequestForm = this.fb.group({
      productGUID: new FormControl(),
      requestCreatedOn: new FormControl(),
      requestGeneratedByArtifactId: new FormControl(),
      requestGeneratedByName: new FormControl(),
      requestGeneratedByEmail: new FormControl(),
      organizationArtifactId: new FormControl(),
      workspaceArtifactId: new FormControl(),
      workspaceGUID: new FormControl(),
      relativityInstanceGUID: new FormControl(),
      isCompleted: new FormControl(),
    });
  }

}
