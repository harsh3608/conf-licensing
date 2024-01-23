import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApproveLicenseModel, LicenseManualRequest } from '../shared/models/license-models';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { OrganizationService } from '../shared/services/organization.service';
import { LicenseService } from '../shared/services/license.service';
import { Organization } from '../shared/models/organization-models';

@Component({
  selector: 'app-manual-license-request',
  templateUrl: './manual-license-request.component.html',
  styleUrl: './manual-license-request.component.css'
})
export class ManualLicenseRequestComponent implements OnInit {
  ManualRequestForm!: FormGroup;
  licenseManualRequest!: LicenseManualRequest;
  organizations: Organization[] = [];
  licenseArtifactId: number = this.config.data.licenseArtifactId;
  approveLicense!: ApproveLicenseModel;


  constructor(
    private fb: FormBuilder,
    public dynamicDialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private organizationService: OrganizationService,
    public config: DynamicDialogConfig,
    private licenseService: LicenseService
  ) { }

  ngOnInit(): void {
    this.getLicenseDetails();
    this.getAllOrganizations();

    this.ManualRequestForm = this.fb.group({
      instanceName: new FormControl('', [Validators.required]),
      instanceNameFriendly: new FormControl('', [Validators.required]),
      instanceURL: new FormControl('', [Validators.required]),
      productName: new FormControl('', [Validators.required]),
      generatedByName: new FormControl('', [Validators.required]),
      generatedByEmail: new FormControl('', [Validators.required]),
      generatedOnUtc: new FormControl('', [Validators.required]),
      organization: new FormControl('', [Validators.required]),
    });
  }

  getLicenseDetails() {
    this.licenseService.getLicenseRequest(this.licenseArtifactId).subscribe((res) => {
      if (res.isSuccess) {
        this.licenseManualRequest = res.response;
        //patches all values at once
        this.ManualRequestForm.patchValue(this.licenseManualRequest);
        //converting date string to date, afterthat assigning it to the form control
        this.ManualRequestForm.get('generatedOnUtc')?.setValue(new Date(this.licenseManualRequest.generatedOnUtc));
      };
    });
  }

  onSubmit() {
    this.ManualRequestForm.markAllAsTouched();
    debugger;
    if (this.ManualRequestForm.valid) {
      this.licenseManualRequest = this.ManualRequestForm.value;
      this.licenseManualRequest.artifactId = 0
      this.licenseManualRequest.isCompleted = false;
      console.log('licenseManualRequest', this.licenseManualRequest);

      console.log('approveLicense', this.approveLicense);
      this.dynamicDialogRef.close(true);
    };
  }

  onCancel() {
    this.dynamicDialogRef.close();
  }

  getAllOrganizations() {
    this.organizationService.getAllOrganizations().subscribe((res) => {
      if (res.isSuccess) {
        this.organizations = res.response
      };
    })
  }

  get instanceName(): FormControl {
    return this.ManualRequestForm.get('instanceName') as FormControl;
  }

  get instanceNameFriendly(): FormControl {
    return this.ManualRequestForm.get('instanceNameFriendly') as FormControl;
  }

  get instanceURL(): FormControl {
    return this.ManualRequestForm.get('instanceURL') as FormControl;
  }

  get productName(): FormControl {
    return this.ManualRequestForm.get('productName') as FormControl;
  }

  get generatedByName(): FormControl {
    return this.ManualRequestForm.get('generatedByName') as FormControl;
  }

  get generatedByEmail(): FormControl {
    return this.ManualRequestForm.get('generatedByEmail') as FormControl;
  }

  get generatedOnUtc(): FormControl {
    return this.ManualRequestForm.get('generatedOnUtc') as FormControl;
  }

  get organization(): FormControl {
    return this.ManualRequestForm.get('organization') as FormControl;
  }


}
