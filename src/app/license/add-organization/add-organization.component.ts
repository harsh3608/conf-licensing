import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrganizationService } from '../shared/services/organization.service';
import { Organization } from '../shared/models/organization-models';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.css'
})
export class AddOrganizationComponent implements OnInit {
  addForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dynamicDialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private organizationService: OrganizationService,
  ) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      artifactId: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      isActive: new FormControl(true, [Validators.required]),
    });
  }

  onSubmit() {
    this.addForm.markAllAsTouched();
    if (this.addForm.valid) {
      let AddRequest: Organization = this.addForm.value;
      this.organizationService.createOrganization(AddRequest).subscribe(
        (res) => {
          if(res.isSuccess) {
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
    return this.addForm.get('name') as FormControl;
  }
  get isActive(): FormControl {
    return this.addForm.get('isActive') as FormControl;
  }
}
