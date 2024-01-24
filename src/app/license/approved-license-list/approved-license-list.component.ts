import { Component, OnInit, ViewChild } from '@angular/core';
import { ApproveLicenseModel } from '../shared/models/license-models';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LicenseService } from '../shared/services/license.service';

@Component({
  selector: 'app-approved-license-list',
  templateUrl: './approved-license-list.component.html',
  styleUrl: './approved-license-list.component.css'
})
export class ApprovedLicenseListComponent implements OnInit {
  approvedLicenses: ApproveLicenseModel[] = [];
  loading: boolean = true;
  @ViewChild('dt') table!: Table;
  ref: DynamicDialogRef | undefined;

  constructor(
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private messageService: MessageService,
    private licenseService: LicenseService,
  ) { }


  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getAllApprovedLicenses();


  }


  getAllApprovedLicenses() {
    this.licenseService.getAllApprovedLicenses().subscribe((res) => {
      if (res.isSuccess) {
        this.approvedLicenses = res.response;
        
      };
      
    });
    this.loading = false;
  }



}
