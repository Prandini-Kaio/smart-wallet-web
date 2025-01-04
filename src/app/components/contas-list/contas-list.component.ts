import {CommonModule} from '@angular/common';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {ContaOutput} from '../../shared/model/conta/conta.model';
import {EditModalComponent} from "./conta-form/conta-form.component";
import {ContaItemComponent} from "./conta-item/conta-item.component";
import {ToastrService} from "../../shared/services/toastr.service";
import {PageHeaderComponent} from "../../shared/components/page-header/page-header.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@Component({
    selector: 'app-contas-list',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ContaItemComponent,
        EditModalComponent,
        PageHeaderComponent,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinner
    ],
    templateUrl: './contas-list.component.html',
    styleUrl: './contas-list.component.scss'
})
export class ContasListComponent implements OnInit {

  public contaSelecionada: ContaOutput | undefined = undefined;
  public isEdit: boolean = false;

  contas: ContaOutput[] = [];
  loading: boolean = true;
  error: string | null = null;

  showModal: boolean = false;

  constructor(private readonly _api: ApiService, private toaster: ToastrService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const conta = {
        id: form.get('id')?.value,
        banco: form.get('banco')?.value,
        nome: form.get('nome')?.value,
        tipoConta: form.get('tipoConta')?.value,
        diaVencimento: form.get('diaVencimento')?.value,
        diaFechamento: form.get('diaFechamento')?.value,
        color: form.get('color')?.value,
      };

      if(this.isEdit){
        this._api.updateConta(conta).subscribe(
          () => {
            this.closeModal();
            this.toaster.success("Conta atualizada com sucesso!", 3000);
          }
        );
      }else{
        this._api.createConta(conta).subscribe(
          () => {
            this.closeModal();
            this.toaster.success("Conta criada com sucesso!", 3000);
          }
        );
      }
    }

    // this.reloadPage();
  }

  getAccounts() {
    this.loading = true;
    this._api.getAllContas().subscribe(
      (data) => {
        this.contas = data;
        this.cdr.detectChanges();
      }
    );
    this.loading = false;
  }

  edit(conta: ContaOutput) {
    this.contaSelecionada = conta;
    this.isEdit = true;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.reloadPage();
  }

  createNew() {
    this.showModal = true;
  }

  deleteConta(obj: any) {

    const data = {
      id: obj.id
    }

    this._api.deleteConta(data).subscribe(() => {
      this.toaster.success("Conta deletada com sucesso!", 3000)
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
