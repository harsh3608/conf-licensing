import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationService } from '../shared/services/organization.service';
import { Organization } from '../shared/models/organization-models';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { OrganizationsAddComponent } from '../organizations-add/organizations-add.component';
import { OrganizationsUpdateComponent } from '../organizations-update/organizations-update.component';

@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrl: './organizations-list.component.css'
})
export class OrganizationsListComponent implements OnInit {
  organizations: Organization[] = [];
  loading: boolean = true;
  @ViewChild('dt') table!: Table;
  ref: DynamicDialogRef | undefined;
  visible: boolean = false;
  statuses: any[] = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },

  ];

  constructor(
    private organizationsService: OrganizationService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getAllOrganizations();
  }


  getAllOrganizations() {
    this.organizationsService.getAllOrganizations().subscribe((res) => {
      if (res?.isSuccess) {
        this.organizations = res.response;
      };

    });
    this.loading = false;
  }

  AddOrganization() {
    this.ref = this.dialogService.open(OrganizationsAddComponent, {
      header: 'Add Organization',
      width: '40%',
      height: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });
    this.ref.onClose.subscribe((res: any) => {
      if (res?.isSuccess) {
        this.organizationsService.getAllOrganizations().subscribe((response) => {
          if (response?.isSuccess) {
            this.organizations = response.response;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.getAllOrganizations();
          };
        })
      }
    });
  }

  updateOrganization(organizationArtifactId: number) {
    this.ref = this.dialogService.open(OrganizationsUpdateComponent, {
      header: 'Update Organization',
      width: '40%',
      height: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        organizationArtifactId: organizationArtifactId
      }
    });
    this.ref.onClose.subscribe((res: any) => {
      if (res?.isSuccess) {
        this.organizationsService.getAllOrganizations().subscribe((response) => {
          if (response?.isSuccess) {
            this.organizations = response.response;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.getAllOrganizations();
          };
        })
      }
    });
  }



}
