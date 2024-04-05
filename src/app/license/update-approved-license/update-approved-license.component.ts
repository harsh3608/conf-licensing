import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApproveLicenseModel } from '../shared/models/license-models';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { OrganizationService } from '../../organizations/shared/services/organization.service';
import { LicenseService } from '../shared/services/license.service';
import { Organization } from '../../organizations/shared/models/organization-models';
import { DatePipe } from '@angular/common';
import { UserService } from '../../shared/services/user.service';

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
  //minStartDate: Date = new Date();
  //minEndDate: Date = new Date();


  constructor(
    private fb: FormBuilder,
    public dynamicDialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private organizationService: OrganizationService,
    public config: DynamicDialogConfig,
    private licenseService: LicenseService,
    private datePipe: DatePipe,
    private userService: UserService,
  ) {
    //this.minStartDate.setDate(this.minStartDate.getDate() + 1);
  }

  ngOnInit(): void {
    this.getLicenseDetails();
    this.getActiveOrganizations();

    this.ManualRequestForm = this.fb.group({
      instanceName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      instanceNameFriendly: new FormControl({ value: '', disabled: true }, [Validators.required]),
      instanceURL: new FormControl({ value: '', disabled: true }, [Validators.required]),
      workspaceArtifactID: new FormControl({ value: '', disabled: true }, [Validators.required]),
      productName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      generatedByName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      generatedByEmail: new FormControl({ value: '', disabled: true }, [Validators.required]),
      relativityVersion: new FormControl({ value: '', disabled: true }, [Validators.required]),
      relativityVersionCore: new FormControl({ value: '', disabled: true }, [Validators.required]),
      workspaceVersion: new FormControl({ value: '', disabled: true }, [Validators.required]),      organization: new FormControl('', [Validators.required]),
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
      this.licenseManualRequest.organizationArtifactId = this.ManualRequestForm.value.organization;
      this.licenseManualRequest.startDate = this.datePipe.transform((this.ManualRequestForm.value.startDate), 'yyyy-MM-dd') || '';
      this.licenseManualRequest.endDate = this.datePipe.transform((this.ManualRequestForm.value.endDate), 'yyyy-MM-dd') || '';
      this.licenseManualRequest.licenseGeneratedBy = this.userService.getLoggedInUserName(),
        this.licenseManualRequest.licenseUpdatedBy = this.userService.getLoggedInUserName(),
        this.licenseManualRequest.organization = ' '

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

  getActiveOrganizations() {
    this.organizationService.getActiveOrganizations().subscribe((res) => {
      if (res.isSuccess) {
        this.organizations = res.response
      };
    })
  }

  // setMinEndDate(event: any) {
  //   this.minEndDate.setDate(event.getDate() + 1);
  // }








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

  get workSpaceId(): FormControl {
    return this.ManualRequestForm.get('workspaceArtifactID') as FormControl;
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

  get relativityVersion(): FormControl {
    return this.ManualRequestForm.get('relativityVersion') as FormControl;
  }

  get relativityVersionCore(): FormControl {
    return this.ManualRequestForm.get('relativityVersionCore') as FormControl;
  }

  get workspaceVersion(): FormControl {
    return this.ManualRequestForm.get('workspaceVersion') as FormControl;
  }

}

