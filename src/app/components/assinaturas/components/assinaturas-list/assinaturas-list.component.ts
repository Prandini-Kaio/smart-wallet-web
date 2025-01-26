import {Component, OnInit} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {CurrencyPipe, NgIf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableModule
} from "@angular/material/table";
import {AssinaturaOutput} from "../../../../shared/model/assinaturas/assinaturas.model";
import {ApiService} from "../../../../services/api.service";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-assinaturas-list',
  imports: [
    MatProgressSpinner,
    NgIf,
    CurrencyPipe,
    MatTableModule,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './assinaturas-list.component.html',
  styleUrl: './assinaturas-list.component.scss'
})
export class AssinaturasListComponent implements OnInit {
  public loading: boolean = false;
  public displayedColumns: string[] = ['Conta', 'Descricao', 'Valor', 'Acoes'];

  public assinaturas: AssinaturaOutput[] = [];

  constructor(private readonly api: ApiService) {
  }

  ngOnInit() {
    this.loading = true;
    this.api.getAssinaturas({}).subscribe(response => {
      this.assinaturas = response;
      this.loading = false;
      console.log(response);
    })
  }

  edit(element: any){

  }

  delete(element: any){

  }
}
