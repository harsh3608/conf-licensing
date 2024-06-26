import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Organization } from '../shared/models/organization-models';
import { OrganizationService } from '../shared/services/organization.service';

@Component({
  selector: 'app-organizations-update',
  templateUrl: './organizations-update.component.html',
  styleUrl: './organizations-update.component.css'
})
export class OrganizationsUpdateComponent implements OnInit {
  updateForm!: FormGroup;
  organizationArtifactId: number = this.config.data.organizationArtifactId;
  currentOrganization!: Organization;


  constructor(
    private fb: FormBuilder,
    public dynamicDialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private organizationService: OrganizationService,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      artifactId: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      isActive: new FormControl('', [Validators.required]),
    });
    this.getOrganization();
  }

  getOrganization() {
    this.organizationService.getOrganization(this.organizationArtifactId).subscribe((res) => {
      if (res) {
        if (res.isSuccess) {
          this.currentOrganization = res.response;
          this.updateForm.patchValue(this.currentOrganization);
        };
      };
    })
  }

  onSubmit() {
    this.updateForm.markAllAsTouched();
    if (this.updateForm.valid) {
      this.currentOrganization = this.updateForm.value;
      this.organizationService.updateOrganization(this.currentOrganization).subscribe(
        (res) => {
          if (res.isSuccess) {
            this.dynamicDialogRef.close(res);
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: res.message });
          };
        }
      )
    };
  }

  onCancel() {
    this.dynamicDialogRef.close();
  }




  get name(): FormControl {
    return this.updateForm.get('name') as FormControl;
  }
  get isActive(): FormControl {
    return this.updateForm.get('isActive') as FormControl;
  }

}
