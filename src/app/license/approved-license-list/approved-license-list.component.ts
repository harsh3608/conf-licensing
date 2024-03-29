import { Component, OnInit, ViewChild } from '@angular/core';
import { ApproveLicenseModel } from '../shared/models/license-models';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LicenseService } from '../shared/services/license.service';
import { UpdateApprovedLicenseComponent } from '../update-approved-license/update-approved-license.component';

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
  visible: boolean = false;
  encryptedString: string = '';

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

  updateApprovedLicense(licenseArtifactId: number) {
    this.ref = this.dialogService.open(UpdateApprovedLicenseComponent, {
      header: 'Update Approved License',
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        licenseArtifactId: licenseArtifactId
      },
    });
    this.ref.onClose.subscribe((res: any) => {
      if (res?.isSuccess) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.getAllApprovedLicenses();
      };
    });
  }

  getAllApprovedLicenses() {
    this.licenseService.getAllApprovedLicenses().subscribe((res) => {
      if (res?.isSuccess) {
        this.approvedLicenses = res.response;
      };

    });
    this.loading = false;
  }

  onCancel() {
    this.visible = false;
  }

  CopyToClipboard() {
    const textArea = document.createElement('textarea');
    textArea.value = this.encryptedString;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'License Key copied to clipboard successfully!' });
  }

  showLicenseKey(key: string) {
    this.visible = true;
    this.encryptedString = key;
  }

}
