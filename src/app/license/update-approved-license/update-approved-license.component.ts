import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApproveLicenseModel, LicenseManualRequest } from '../shared/models/license-models';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { OrganizationService } from '../shared/services/organization.service';
import { LicenseService } from '../shared/services/license.service';
import { Organization } from '../shared/models/organization-models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-approved-license',
  templateUrl: './update-approved-license.component.html',
  styleUrl: './update-approved-license.component.css',
  providers: [DatePipe]
})
export class UpdateApprovedLicenseComponent implements OnInit {
  ManualRequestForm!: FormGroup;
  licenseManualRequest!: ApproveLicenseModel;
  licenseManualRequest2!: ApproveLicenseModel;
  organizations: Organization[] = [];
  licenseArtifactId: number = this.config.data.licenseArtifactId;
  approveLicense!: ApproveLicenseModel;
  minStartDate: Date = new Date();
  minEndDate: Date = new Date();


  constructor(
    private fb: FormBuilder,
    public dynamicDialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private organizationService: OrganizationService,
    public config: DynamicDialogConfig,
    private licenseService: LicenseService,
    private datePipe: DatePipe,
  ) {
    this.minStartDate.setDate(this.minStartDate.getDate() + 1);
  }

  ngOnInit(): void {
    this.getLicenseDetails();
    this.getAllOrganizations();

    this.ManualRequestForm = this.fb.group({
      instanceName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      instanceNameFriendly: new FormControl({ value: '', disabled: true }, [Validators.required]),
      instanceURL: new FormControl({ value: '', disabled: true }, [Validators.required]),
      productName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      generatedByName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      generatedByEmail: new FormControl({ value: '', disabled: true }, [Validators.required]),
      // generatedOnUtc: new FormControl({ value: '', disabled: true }, [Validators.required]),
      organization: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
    });
  }

  getLicenseDetails() {
    this.licenseService.getApprovedLicense(this.licenseArtifactId).subscribe((res) => {
      if (res.isSuccess) {
        this.licenseManualRequest = res.response;
        this.licenseManualRequest2 = res.response;
        console.log('fetched license', res.response);
        //patches all values at once
        this.ManualRequestForm.patchValue(this.licenseManualRequest);
        // //converting date string to date, afterthat assigning it to the form control
        // this.ManualRequestForm.get('generatedOnUtc')?.setValue(new Date(this.licenseManualRequest.generatedOnUtc));
        this.ManualRequestForm.get('organization')?.setValue(this.licenseManualRequest.organizationArtifactId);
        this.ManualRequestForm.get('startDate')?.setValue(new Date(this.licenseManualRequest.startDate));
        this.ManualRequestForm.get('endDate')?.setValue(new Date(this.licenseManualRequest.endDate));
      };
    });
  }

  onSubmit() {
    this.ManualRequestForm.markAllAsTouched();
    
    if (this.ManualRequestForm.valid) {
      // this.licenseManualRequest.instanceName = this.ManualRequestForm.value.instanceName;
      // this.licenseManualRequest.instanceNameFriendly = this.ManualRequestForm.value.instanceNameFriendly;
      // this.licenseManualRequest.instanceURL = this.ManualRequestForm.value.instanceURL;
      // this.licenseManualRequest.productName = this.ManualRequestForm.value.productName;
      // this.licenseManualRequest.generatedByName = this.ManualRequestForm.value.generatedByName;
      // this.licenseManualRequest.generatedByEmail = this.ManualRequestForm.value.generatedByEmail;
      //this.licenseManualRequest.generatedOnUtc = this.datePipe.transform((this.ManualRequestForm.value.generatedOnUtc), 'yyyy-MM-dd HH:mm') || '';
      this.licenseManualRequest.organizationArtifactId = this.ManualRequestForm.value.organization;
      this.licenseManualRequest.startDate = this.datePipe.transform((this.ManualRequestForm.value.startDate), 'yyyy-MM-dd') || '';
      this.licenseManualRequest.endDate = this.datePipe.transform((this.ManualRequestForm.value.endDate), 'yyyy-MM-dd') || '';

      console.log('licenseManualRequest', this.licenseManualRequest);
      this.licenseService.updateApprovedLicense(this.licenseManualRequest).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.dynamicDialogRef.close(res);
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: res.message });
          }
        }
      );
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

  setMinEndDate(event: any) {
    this.minEndDate.setDate(event.getDate() + 1);
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

  get startDate(): FormControl {
    return this.ManualRequestForm.get('startDate') as FormControl;
  }

  get endDate(): FormControl {
    return this.ManualRequestForm.get('endDate') as FormControl;
  }

}

