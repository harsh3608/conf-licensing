import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../../shared/services/app.layout.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  timeout: any = null;
  @ViewChild('menuContainer') menuContainer!: ElementRef;
  model: any[] = [];

  constructor(
    public layoutService: LayoutService,
    public el: ElementRef
  ) { }

  ngOnInit() {

  }


}
