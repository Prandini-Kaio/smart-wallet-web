import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ErrorLog} from "../../../../shared/model/monitor-erros/model/monitor-erros.model";

@Component({
  selector: 'app-monitor-erros-item',
  imports: [],
  templateUrl: './monitor-erros-item.component.html',
  styleUrl: './monitor-erros-item.component.scss'
})
export class MonitorErrosItemComponent {
  @Input() error!: ErrorLog;
  @Output() viewDetails = new EventEmitter<ErrorLog>();

  onView(){
    this.viewDetails.emit(this.error);
  }
}
