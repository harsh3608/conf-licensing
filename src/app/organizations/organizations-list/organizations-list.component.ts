import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganizationService } from '../shared/services/organization.service';
import { Organization } from '../shared/models/organization-models';
import { Table } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrl: './organizations-list.component.css'
})
export class OrganizationsListComponent implements OnInit {
  organizations:Organization[]=[];
  loading: boolean = true;
  @ViewChild('dt') table!: Table;
  ref: DynamicDialogRef | undefined;
  visible: boolean = false;

  constructor(
    private organizationsService: OrganizationService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {

  }

}
