import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApproveLicenseModel, LicenseManualRequest } from '../shared/models/license-models';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { OrganizationService } from '../shared/services/organization.service';
import { LicenseService } from '../shared/services/license.service';
import { Organization } from '../shared/models/organization-models';
import { DatePipe } from '@angular/common';
import { AddOrganizationComponent } from '../add-organization/add-organization.component';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-manual-license-request',
  templateUrl: './manual-license-request.component.html',
  styleUrl: './manual-license-request.component.css',
  providers: [DatePipe]
})
export class ManualLicenseRequestComponent implements OnInit {
  ManualRequestForm!: FormGroup;
  licenseManualRequest!: LicenseManualRequest;
  licenseManualRequest2!: LicenseManualRequest;
  organizations: Organization[] = [];
  licenseArtifactId: number = this.config.data.licenseArtifactId;
  approveLicense!: ApproveLicenseModel;
  minStartDate: Date = new Date();
  minEndDate: Date = new Date();
  ref: DynamicDialogRef | undefined;


  constructor(
    private fb: FormBuilder,
    public dynamicDialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private organizationService: OrganizationService,
    public config: DynamicDialogConfig,
    private licenseService: LicenseService,
    private datePipe: DatePipe,
    public dialogService: DialogService,
    private userService: UserService
  ) {
    this.minStartDate.setDate(this.minStartDate.getDate() + 1);
  }

  ngOnInit(): void {
    this.userService.getLoggedInUserName();
    this.getLicenseDetails();
    this.getAllOrganizations();

    this.ManualRequestForm = this.fb.group({
      instanceName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      instanceNameFriendly: new FormControl({ value: '', disabled: true }, [Validators.required]),
      instanceURL: new FormControl({ value: '', disabled: true }, [Validators.required]),
      productName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      generatedByName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      generatedByEmail: new FormControl({ value: '', disabled: true }, [Validators.required]),
      generatedOnUtc: new FormControl({ value: '', disabled: true }, [Validators.required]),
      organization: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
    });
  }

  getLicenseDetails() {
    this.licenseService.getLicenseRequest(this.licenseArtifactId).subscribe((res) => {
      if (res.isSuccess) {
        this.licenseManualRequest = res.response;
        this.licenseManualRequest2 = res.response;
        //patches all values at once
        this.ManualRequestForm.patchValue(this.licenseManualRequest);
        //converting date string to date, afterthat assigning it to the form control
        this.ManualRequestForm.get('generatedOnUtc')?.setValue(new Date(this.licenseManualRequest.generatedOnUtc));
        this.ManualRequestForm.get('organization')?.setValue(this.licenseManualRequest.organizationArtifactId);
      };
    });
  }

  onSubmit() {
    this.ManualRequestForm.markAllAsTouched();
    if (this.ManualRequestForm.valid) {

      this.licenseManualRequest2.organizationArtifactId = this.ManualRequestForm.value.organization;
      this.licenseManualRequest2.isCompleted = true;
      this.licenseManualRequest2.organization = 'string'
      console.log('licenseManualRequest', this.licenseManualRequest2);

      this.approveLicense = {
        licenseKey: '',
        startDate: this.datePipe.transform(
          (this.ManualRequestForm.value.startDate),
          'yyyy-MM-dd'
        ) || '',
        endDate: this.datePipe.transform(
          (this.ManualRequestForm.value.endDate),
          'yyyy-MM-dd'
        ) || '',
        licenseGeneratedBy: this.userService.getLoggedInUserName(),
        licenseUpdatedBy: this.userService.getLoggedInUserName(),
        status: 2,
        ...this.licenseManualRequest2,

      };
      this.approveLicense.artifactId = 0;
      console.log('approveLicense', this.approveLicense);
      //this.dynamicDialogRef.close(true);

      this.licenseService.updateLicenseRequest(this.licenseManualRequest2).subscribe((res) => {
        if (res.isSuccess) {
          this.licenseService.generateLicense(this.approveLicense).subscribe((res) => {
            if (res.isSuccess) {
              this.dynamicDialogRef.close(res);
            }
          });
        };
      });
    };
  }

  onCancel() {
    this.dynamicDialogRef.close();
  }

  getAllOrganizations() {
    this.organizationService.getAllOrganizations().subscribe((res) => {
      if (res.isSuccess) {
        this.organizations = res.response;
      };
    });
  }

  setMinEndDate(event: any) {
    this.minEndDate.setDate(event.getDate() + 1);
  }

  AddOrganization() {
    this.ref = this.dialogService.open(AddOrganizationComponent, {
      header: 'Add Organization',
      width: '40%',
      height: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });
    this.ref.onClose.subscribe((res: any) => {
      if (res?.isSuccess) {
        this.organizationService.getAllOrganizations().subscribe((response) => {
          if (response?.isSuccess) {
            debugger;
            this.organizations = response.response;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'New Organization added successfully!' });
            this.ManualRequestForm.get('organization')?.setValue(res.response);
          };
        })
      }
    });
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
