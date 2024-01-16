import { Component, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { ManualLicenseRequestComponent } from '../manual-license-request/manual-license-request.component';
import { AutomatedLicenseRequestComponent } from '../automated-license-request/automated-license-request.component';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrl: './license-list.component.css',
  providers: [DialogService, DynamicDialogRef]
})
export class LicenseListComponent {
  customers: any[] = [];

  selectedCustomers: any[] = [];

  representatives: any[] = [];

  statuses: any[] = [];

  loading: boolean = true;

  @ViewChild('dt') table!: Table;
  ref: DynamicDialogRef | undefined;

  constructor(
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,

    ) { }

  ngOnInit() {

    this.primengConfig.ripple = true;

    this.loading = false
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
  }

  AddAutomatedLicenseRequest() {
    this.ref = this.dialogService.open(AutomatedLicenseRequestComponent, {
      header: 'Add new license (Automated Request)',
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      
    });
  }

}
