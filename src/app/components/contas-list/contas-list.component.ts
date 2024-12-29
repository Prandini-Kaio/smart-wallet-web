import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';
import { ContaOutput } from '../../shared/conta/conta.model';
import { EditModalComponent } from "./conta-form/conta-form.component";
import { ContaItemComponent } from "./conta-item/conta-item.component";


@Component({
  selector: 'app-contas-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContaItemComponent,
    EditModalComponent
],
  templateUrl: './contas-list.component.html',
  styleUrl: './contas-list.component.scss'
})
export class ContasListComponent {

  public contaSelecionada: ContaOutput | undefined = undefined;
  public isEdit: boolean = false;

  contas: ContaOutput[] = [];
  loading: boolean = false;
  error: string | null = null;

  selectedAccount: ContaOutput | null = null;
  totalBalance: number = 0;
  showModal: boolean = false;

  constructor(private readonly _api: ApiService, private _toaster: ToastrService) { }

  ngOnInit(): void {

    this.contas = this.getAccounts();
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const conta = {
        banco: form.get('banco')?.value,
        nome: form.get('nome')?.value,
        tipoConta: form.get('tipoConta')?.value,
        diaVencimento: form.get('diaVencimento')?.value,
        color: form.get('color')?.value,
      };

      if(this.isEdit){
        this._api.updateConta(conta).subscribe(
          (response) => {
            this.closeModal();
            this._toaster.show("Conta atualizada com sucesso!", 'success')
          }
        );
      }else{
        this._api.createConta(conta).subscribe(
          (response) => {
            this.closeModal();
            this._toaster.show("Conta criada com sucesso!", 'success')
          }
        );
      }
    }

    // this.reloadPage();
  }

  getAccounts(): ContaOutput[] {
    this._api.getAllContas().subscribe(
      (data) => {
        return this.contas = data;
      },
      (error) => {
        console.error('Erro carregando lancamentos:', error);
      }
    );

    return [];
  }

  edit(conta: ContaOutput) {
    this.contaSelecionada = conta;
    this.isEdit = true;
    this.showModal = true;
  }

  calculateTotalBalance(): void {
    this.totalBalance = this.contas.reduce((sum, conta) => sum + conta.saldoParcial, 0);
  }

  selectAccount(conta: ContaOutput): void {
    this.selectedAccount = conta;
  }

  addConta(): void {
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

    this._api.deleteConta(data).subscribe((data) => {
      this._toaster.success("Conta deletada.", "Sucesso!")
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
