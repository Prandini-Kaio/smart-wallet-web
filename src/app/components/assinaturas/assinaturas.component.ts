import { Component } from '@angular/core';
import {PageHeaderComponent} from "../../shared/components/page-header/page-header.component";
import {AssinaturasListComponent} from "./components/assinaturas-list/assinaturas-list.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AssinaturasNovoComponent} from "./components/assinaturas-novo/assinaturas-novo.component";

@Component({
  selector: 'app-assinaturas',
  imports: [
    PageHeaderComponent,
    AssinaturasListComponent,
    AssinaturasNovoComponent,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './assinaturas.component.html',
  styleUrl: './assinaturas.component.scss'
})
export class AssinaturasComponent {

}
