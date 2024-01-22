import { Component, ViewChild } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { ManualLicenseRequestComponent } from '../manual-license-request/manual-license-request.component';
import { AutomatedLicenseRequestComponent } from '../automated-license-request/automated-license-request.component';
import { LicenseService } from '../shared/services/license.service';
import { LicenseManualRequest } from '../shared/models/license-models';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrl: './license-list.component.css',
  //providers: [DialogService, DynamicDialogRef]
})
export class LicenseListComponent {
  licenseRequests: LicenseManualRequest[] = [];

  representatives: any[] = [];

  statuses: any[] = [];

  loading: boolean = true;

  @ViewChild('dt') table!: Table;
  ref: DynamicDialogRef | undefined;

  constructor(
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private messageService: MessageService,
    private licenseService: LicenseService,


  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.loading = false;
    this.getAllLicenseRequests();


  }

  onActivityChange(event: any) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }

  onDateSelect(value: any) {
    this.table.filter(this.formatDate(value), 'date', 'equals')
  }

  formatDate(date: any) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  onRepresentativeChange(event: any) {
    this.table.filter(event.value, 'representative', 'in')
  }

  AddManualLicenseRequest() {
    this.ref = this.dialogService.open(ManualLicenseRequestComponent, {
      header: 'Add new license (Manual Request)',
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,

    });
    this.ref.onClose.subscribe((res: any) => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'License requested successfully!' });
      }
    });
  }

  AddAutomatedLicenseRequest() {
    this.ref = this.dialogService.open(AutomatedLicenseRequestComponent, {
      header: 'Add new license (Automated Request)',
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,

    });
    this.ref.onClose.subscribe((res: any) => {
      debugger;
      if (res !== undefined) {
        if (res.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'License requested successfully!' });
          this.getAllLicenseRequests();
        } else if (!res.isSuccess) {
          this.messageService.add({ severity: 'warn', summary: 'Warn', detail: res?.message });
        };
      }
    });
  }

  getAllLicenseRequests() {
    this.licenseService.getAllLicenseRequests().subscribe((res) => {
      if (res.isSuccess) {
        this.licenseRequests = res.response;
        console.log(this.licenseRequests);
        this.licenseRequests.map(request => {
          request.requestCreatedOn = new Date(request.requestCreatedOn);
        });
        console.log('date modified',this.licenseRequests);
      };
    });
  }

}
