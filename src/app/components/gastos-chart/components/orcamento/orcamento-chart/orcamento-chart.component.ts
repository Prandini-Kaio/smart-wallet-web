import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../../../../../services/api.service';
import { Orcamento } from '../../../../../shared/model/orcamento/orcamento.model';
import { OrcamentoFormComponent } from "../orcamento-form/orcamento-form.component";
import { OrcamentoItemComponent } from "../orcamento-item/orcamento-item.component";
import {ToastrService} from "../../../../../shared/services/toastr.service";



@Component({
  selector: 'app-orcamento-chart',
  standalone: true,
  imports: [
    CommonModule,
    OrcamentoItemComponent,
    OrcamentoFormComponent
],
  templateUrl: './orcamento-chart.component.html',
  styleUrl: './orcamento-chart.component.scss'
})
export class OrcamentoChartComponent {
  @Input() orcamentos: Orcamento[] = []

  public showModal = false;

  constructor(private readonly api: ApiService, private toastr: ToastrService) { }

  onSubmit(form: FormGroup){

    const data = {
      valor: form.get('valor')?.value,
      categoria: form.get('categoria')?.value,
      mes: form.get('mes')?.value
    }

    this.api.createOrcamento(data).subscribe((data) => {
      this.toastr.success("Orçamento criado com sucesso!", 3000);
    })
  }

  showOrcamentoModal() {
    this.showModal = !this.showModal;
  }
}
