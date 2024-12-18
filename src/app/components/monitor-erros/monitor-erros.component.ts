import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ErrorLog } from '../../shared/monitor-erros/model/monitor-erros.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-monitor-erros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monitor-erros.component.html',
  styleUrl: './monitor-erros.component.scss'
})
export class MonitorErrosComponent{
  errors: ErrorLog[] = [];
  isModalOpen = false;
  selectedLog: any = null;

  constructor(private readonly _api: ApiService) {

  }

  ngOnInit(): void {
    this.errors = this.getErrors();
  }

  getErrors(): ErrorLog[]{
    this._api.getErrors().subscribe(errors => {
      return this.errors = errors;
    }, (error) => {
      console.error(error);
    });

    return [];
  }

  openModal(log: any): void {
    this.selectedLog = log;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedLog = null;
  }
}