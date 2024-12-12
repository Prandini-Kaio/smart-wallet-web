import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaOutput, TipoContaOutput } from '../../shared/conta/conta.model';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contas-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contas-list.component.html',
  styleUrl: './contas-list.component.scss'
})
export class ContasListComponent {
  contas: ContaOutput[] = [];
  loading: boolean = false;
  error: string | null = null;
  tipoContas: TipoContaOutput[] = [];


  selectedAccount: ContaOutput | null = null;
  totalBalance: number = 0;
  showModal: boolean = false;
  showEditModal: boolean = false;
  form: FormGroup = new FormGroup({});
  editForm: FormGroup = new FormGroup({});

  constructor(private readonly _api: ApiService) { }

  ngOnInit(): void {

    this.contas = this.getAccounts();

    this.form = new FormGroup({
      banco: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      tipoConta: new FormControl('', Validators.required),
      diaVencimento: new FormControl(0, Validators.required),
      color: new FormControl('#000000', Validators.required)
    });

    this.editForm = new FormGroup({
      banco: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      tipoConta: new FormControl('', Validators.required),
      diaVencimento: new FormControl(0, Validators.required),
      color: new FormControl('#000000', Validators.required)
    });

    this.getTipoContas();

  }

  onSubmit(): void {
    if (this.form.valid) {
      const conta = {
        banco: this.form.get('banco')?.value,
        nome: this.form.get('nome')?.value,
        tipoConta: this.form.get('tipoConta')?.value,
        diaVencimento: this.form.get('diaVencimento')?.value,
        color: this.form.get('color')?.value,
      };

      this._api.createConta(conta).subscribe(
        (response) => {
          this.closeModal();
          // Opcional: Adicionar mensagem de sucesso ou atualizar lista de contas
        },
        (error) => {
          console.log(error);
          // Opcional: Adicionar tratamento de erro
        }
      );
    }

    // this.reloadPage();
  }

  onEditSubmit(): void {
    if (this.form.valid) {
      const conta = {
        banco: this.form.get('banco')?.value,
        nome: this.form.get('nome')?.value,
        tipoConta: this.form.get('tipoConta')?.value,
        diaVencimento: this.form.get('diaVencimento')?.value,
        color: this.form.get('color')?.value,
      };

      this._api.createConta(conta).subscribe(
        (response) => {
          this.closeModal();
        },
        (error) => {
          console.log(error);
        }
      );
    }

    this.reloadPage();
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

  getTipoContas(){
    this._api.getTipoConta().subscribe((data) => {
      console.log(data);
      this.tipoContas = data;
    });
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

  closeEditModal() {
    this.showEditModal = false;
    this.reloadPage();
  }

  createNew() {
    this.showModal = true;
  }

  reloadPage() {
    window.location.reload();
  }

  editConta(conta: any) {
    this.showEditModal = true;

    this.editForm = new FormGroup({
      banco: new FormControl(conta.banco, Validators.required),
      nome: new FormControl(conta.nome, Validators.required),
      tipoConta: new FormControl(conta.tipoConta, Validators.required),
      diaVencimento: new FormControl(conta.diaVencimento, Validators.required),
      color: new FormControl(conta.color, Validators.required)
    });
  }

  deleteConta(obj: any) {

  }
}
