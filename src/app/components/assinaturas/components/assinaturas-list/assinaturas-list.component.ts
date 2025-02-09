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
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ToastrService} from "../../../../shared/services/toastr.service";

@Component({
  selector: 'app-assinaturas-list',
  imports: [
    MatProgressSpinner,
    NgIf,
    CurrencyPipe,
    MatTableModule,
    MatIconButton,
    MatIcon,
    MatSlideToggleModule
  ],
  templateUrl: './assinaturas-list.component.html',
  styleUrl: './assinaturas-list.component.scss'
})
export class AssinaturasListComponent implements OnInit {
  public loading: boolean = false;
  public displayedColumns: string[] = ['Conta', 'Descricao', 'Valor', 'Acoes'];

  public assinaturas: AssinaturaOutput[] = [];

  constructor(private readonly api: ApiService, private readonly toaster: ToastrService) {
  }

  ngOnInit() {
    this.loadAssinaturas();
  }

  loadAssinaturas() {
    this.loading = true;
    this.api.getAssinaturas({}).subscribe(response => {
      this.assinaturas = response;
      this.loading = false;
    })
  }

  edit(element: any){

  }

  delete(element: AssinaturaOutput){
    this.api.deleteAssinatura(element.id).subscribe(response => {
      this.toaster.success('Assinatura deletada com sucesso!', 3000);
      this.loadAssinaturas();
    });
  }

  onChangeAtivo(element: AssinaturaOutput) {
    element.ativa = !element.ativa;

    const params = {
      id: element.id,
      descricao: element.descricao,
      contaDestinoId: element.contaDestino.id,
      contaOrigemId: element.contaOrigem?.id,
      valor: element.valor,
      ativa: element.ativa,
      dtInicio: element.dtInicio,
      dtFim: element.dtFim
    }

    this.api.updateAssinatura(params).subscribe(response => {
      this.toaster.success('Assinatura atualizada com sucesso!', 3000);
      this.loadAssinaturas();
    }, error => {
      console.error('Error updating status', error);
      element.ativa = !element.ativa; // Revert the change in case of error
    });
  }
}
