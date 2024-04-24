import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
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
  loading: boolean = true;
  @ViewChild('dt') table!: Table;
  ref: DynamicDialogRef | undefined;
  visible: boolean = false;
  visibleConfirmation: boolean = false;
  encryptedString: string = '';

  constructor(
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private messageService: MessageService,
    private licenseService: LicenseService,
    private confirmationService: ConfirmationService

  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.loading = false;
    this.getAllLicenseRequests();


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
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'License Details copied to clipboard successfully!' });
  }

  AddManualLicenseRequest(licenseArtifactId: number) {
    this.ref = this.dialogService.open(ManualLicenseRequestComponent, {
      header: 'Generate License',
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
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'License generated successfully!' });
        this.getAllLicenseRequests();
        this.encryptedString = res.response;
        this.visible = true;
      }
    });
  }

  AddAutomatedLicenseRequest() {
    this.ref = this.dialogService.open(AutomatedLicenseRequestComponent, {
      header: 'Add new license Request',
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,

    });
    this.ref.onClose.subscribe((res: any) => {
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
        //console.log(this.licenseRequests);
        this.licenseRequests.map(request => {
          request.generatedOnUtc = new Date(request.generatedOnUtc);
        });
        //console.log('date modified', this.licenseRequests);
        this.loading = false;
      };
    });
  }




  openConfirmation(event: Event, requestId: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this request?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.licenseService.deleteLicenseRequest(requestId).subscribe(
          (res) => {
            if (res.isSuccess) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.getAllLicenseRequests();
            } else {
              this.messageService.add({ severity: 'warn', summary: 'Success', detail: res.message });
            }
          }
        )
      },
      reject: () => {

      }
    });
  }
}
