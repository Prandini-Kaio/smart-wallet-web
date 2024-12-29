import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../../services/api.service';
import { Orcamento } from '../../../../../shared/orcamento/orcamento.model';
import { OrcamentoFormComponent } from "../orcamento-form/orcamento-form.component";
import { OrcamentoItemComponent } from "../orcamento-item/orcamento-item.component";



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
      this.toastr.success("Orçamento criado.", "Sucesso!");
    })
  }

  showOrcamentoModal() {
    this.showModal = !this.showModal;
  }
}
