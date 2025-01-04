import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule,} from '@angular/forms';
import {Router} from '@angular/router';
import {LancamentoFilterComponent} from '../lancamento-filter/lancamento-filter.component';
import {LancamentoItemComponent} from '../lancamento-item/lancamento-item.component';
import {FormLancamentoComponent} from '../form-lancamento/form-lancamento.component';
import {LancamentoService} from '../../service/lancamento.service';
import {LancamentoOutput, Totalizador} from "../../../../shared/model/lancamento/model/lancamento.model";
import {ApiService} from "../../../../services/api.service";
import {ToastrService} from "../../../../shared/services/toastr.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
    selector: 'app-lancamento-list',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LancamentoItemComponent,
        LancamentoFilterComponent,
        FormLancamentoComponent,
        MatProgressSpinner
    ],
    templateUrl: './lancamento-list.component.html',
    styleUrl: './lancamento-list.component.scss'
})
export class LancamentoListComponent implements OnInit {
  lancamentos: LancamentoOutput[] = [];
  loading: boolean = true;

  protected showCreateModalLancamento = false;
  protected showEditModalLancamento = false;

  public totalizador: Totalizador = {
    totalEntrada: 0,
    totalSaida: 0,
    total: 0,
  };

  constructor(
    private readonly _api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private lancamentoService: LancamentoService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this._api.getLancamento({}).subscribe((data) => {
      this.lancamentos = data;
      this.loading = false;
    });

    this._api.getTotalizadorTransacoes({}).subscribe((response) => {
      this.totalizador = response;
    });
    this.loading = false;
  }

  viewDetails(id: string): void {
    this.router.navigate(['lancamentos/details', id]);
  }

  editLancamento(lancamento: LancamentoOutput): void {
    console.log(lancamento);
    this.lancamentoService.setLancamento(lancamento);
    this.showEditModalLancamento = true;
  }

  copy(lancamento: LancamentoOutput): void {
    console.log(lancamento);
    this.lancamentoService.setLancamento(lancamento);
    this.createModal();
  }

  onSubmit(request: any) {
    this._api.createLancamento(request).subscribe((response) => {
      this.toastr.success('Lançamento criado com sucesso!', 3000);
    });
    this.showCreateModalLancamento = false;
    this.router.navigate(['lancamentos/view']);
  }

  onEditSubmit(request: any) {
    this._api.updateLancamento(request).subscribe((response) => {
      this.toastr.success('Lançamento atualizado com sucesso!', 3000);
    });
    this.showEditModalLancamento = false;
    this.router.navigate(['lancamentos/view']);
  }

  createModal() {
    this.showCreateModalLancamento = !this.showCreateModalLancamento;
  }

  editModal() {
    this.showEditModalLancamento = !this.showEditModalLancamento;
  }

  deleteLancamento(lancamento: LancamentoOutput): void {
    const data = {
      id: lancamento.id,
    };

    this._api.deleteLancamento(data).subscribe((data) => {
      this.toastr.success('Lançamento deletado com sucesso!', 3000);
    });

    this.router.navigate(['lancamentos/view']);
  }

  applyFilters(filters: any) {
    this._api.getLancamento(filters).subscribe((data) => {
      this.lancamentos = data;
      this.loading = false;
    });

    this._api.getTotalizadorTransacoes(filters).subscribe((response) => {
      this.totalizador = response;
    });
  }
}
