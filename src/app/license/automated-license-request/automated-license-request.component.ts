import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LicenseService } from '../shared/services/license.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-automated-license-request',
  templateUrl: './automated-license-request.component.html',
  styleUrl: './automated-license-request.component.css'
})
export class AutomatedLicenseRequestComponent implements OnInit {
  automatedRequestForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private licenseService: LicenseService,
    public dynamicDialogRef: DynamicDialogRef,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.automatedRequestForm = this.fb.group({
      encryptedString: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.automatedRequestForm.get('encryptedString')?.value);
    let encryptedString = this.automatedRequestForm.get('encryptedString')?.value;
    this.automatedRequestForm.markAllAsTouched();
    if (this.automatedRequestForm.valid) {
      let request = {
        request: encryptedString
      }
      this.licenseService.CreateLicenseRequest(request).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.dynamicDialogRef.close(res);
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: res.message });
          };
        }
      );
    };

  }

  onCancel() {
    this.dynamicDialogRef.close();
  }

  get encryptedString(): FormControl {
    return this.automatedRequestForm.get('encryptedString') as FormControl;
  }
}
