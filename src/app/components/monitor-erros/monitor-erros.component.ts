import {Component} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ErrorLog} from '../../shared/model/monitor-erros/model/monitor-erros.model';
import {CommonModule} from '@angular/common';
import {PageHeaderComponent} from "../../shared/components/page-header/page-header.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MonitorErrosItemComponent} from "./components/monitor-erros-item/monitor-erros-item.component";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
    selector: 'app-monitor-erros',
    imports: [
      CommonModule,
      PageHeaderComponent,
      MonitorErrosItemComponent,
      MatProgressSpinner,
      MatFormFieldModule
    ],
    templateUrl: './monitor-erros.component.html',
    styleUrl: './monitor-erros.component.scss'
})
export class MonitorErrosComponent{
  errors: ErrorLog[] = [];
  isModalOpen = false;
  selectedLog: ErrorLog | null = null;

  public loading = false;

  constructor(private readonly _api: ApiService) {

  }

  ngOnInit(): void {
    this.getErrors();
  }

  getErrors() {
    this.loading = true;
    this._api.getErrors().subscribe(errors => {
      this.errors = errors;
    });
    this.loading = false;
  }

  openModal(log: ErrorLog): void {
    this.selectedLog = log;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedLog = null;
  }
}
