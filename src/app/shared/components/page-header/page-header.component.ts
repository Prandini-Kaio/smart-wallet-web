import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {

  @Input() navName: string = 'Dashboard';
  @Input() title: string = 'Dashboard';
}
