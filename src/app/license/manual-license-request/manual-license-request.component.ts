import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LicenseManualRequest } from '../shared/models/license-models';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manual-license-request',
  templateUrl: './manual-license-request.component.html',
  styleUrl: './manual-license-request.component.css'
})
export class ManualLicenseRequestComponent implements OnInit {
  ManualRequestForm!: FormGroup;
  licenseManualRequest!: LicenseManualRequest;
  organizations: any[] = [
    {
      organizationArtifactId: 1234567,
      name: 'Unilever'
    },
    {
      organizationArtifactId: 1232475,
      name: 'TATA'
    },
    {
      organizationArtifactId: 6584534,
      name: 'Godrej'
    },
    {
      organizationArtifactId: 4568512,
      name: 'Reliance'
    },
    {
      organizationArtifactId: 8569472,
      name: 'Bharti Airtel'
    }
  ];

  constructor(
    private fb: FormBuilder,
    public dynamicDialogRef: DynamicDialogRef,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {


    this.ManualRequestForm = this.fb.group({
      productGUID: new FormControl('', [Validators.required]),
      requestGeneratedByArtifactId: new FormControl('', [Validators.required]),
      requestGeneratedByName: new FormControl('', [Validators.required]),
      requestGeneratedByEmail: new FormControl('', [Validators.required]),
      organizationArtifactId: new FormControl('', [Validators.required]),
      workspaceArtifactId: new FormControl('', [Validators.required]),
      workspaceGUID: new FormControl('', [Validators.required]),
      relativityInstanceGUID: new FormControl('', [Validators.required]),
    });
  }


  onSubmit() {
    this.ManualRequestForm.markAllAsTouched();
    if (this.ManualRequestForm.valid) {
      this.licenseManualRequest = this.ManualRequestForm.value;
      this.licenseManualRequest.artifactId = 0
      this.licenseManualRequest.isCompleted = false;
      console.log('licenseManualRequest', this.licenseManualRequest);

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'License requested successfully!' });
      this.dynamicDialogRef.close(true);
    };
  }

  onCancel() {
    this.dynamicDialogRef.close();
  }



  get productGUID(): FormControl {
    return this.ManualRequestForm.get('productGUID') as FormControl;
  }

  get requestGeneratedByArtifactId(): FormControl {
    return this.ManualRequestForm.get('requestGeneratedByArtifactId') as FormControl;
  }

  get requestGeneratedByName(): FormControl {
    return this.ManualRequestForm.get('requestGeneratedByName') as FormControl;
  }

  get requestGeneratedByEmail(): FormControl {
    return this.ManualRequestForm.get('requestGeneratedByEmail') as FormControl;
  }

  get organizationArtifactId(): FormControl {
    return this.ManualRequestForm.get('organizationArtifactId') as FormControl;
  }

  get workspaceArtifactId(): FormControl {
    return this.ManualRequestForm.get('workspaceArtifactId') as FormControl;
  }

  get workspaceGUID(): FormControl {
    return this.ManualRequestForm.get('workspaceGUID') as FormControl;
  }

  get relativityInstanceGUID(): FormControl {
    return this.ManualRequestForm.get('relativityInstanceGUID') as FormControl;
  }


}
