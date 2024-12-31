import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Orcamento } from "../../shared/orcamento/orcamento.model";
import { OrcamentoChartComponent } from "../gastos-chart/components/orcamento/orcamento-chart/orcamento-chart.component";
import { MatFormField } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ContaOutput } from "../../shared/conta/conta.model";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";

interface OrderStatus {
  status: string;
  count: number;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    OrcamentoChartComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
],
  styleUrl: 'home.component.scss',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit{
  saldoParcial = 0;
  storeRevenue = 3236;
  onlineStoreRevenue = 3764;
  debtCollection = 1800;
  otherAmounts = 1200;
  totalOrders = 86;

  contas: ContaOutput[] = []
  contasSelecionadas: ContaOutput[] = []

  orcamentos: Orcamento[] = [
    { id: 1, limite: 500, gastoAtual: 200, categoria: "Lazer", mes: "Dezembro" },
    { id: 1, limite: 2500, gastoAtual: 1250, categoria: "Moradia", mes: "Dezembro" },
    { id: 1, limite: 500, gastoAtual: 300, categoria: "Alimentacao", mes: "Dezembro" },
    { id: 1, limite: 100, gastoAtual: 99, categoria: "Saude", mes: "Dezembro" },
    { id: 1, limite: 100, gastoAtual: 99, categoria: "LAZER", mes: "Dezembro" }
  ]

  orderStatuses: OrderStatus[] = [
    { status: 'Success', count: 24, color: '#10B981' },
    { status: 'Waiting', count: 32, color: '#8B5CF6' },
    { status: 'Cancel', count: 16, color: '#EF4444' },
    { status: 'Processing', count: 14, color: '#3B82F6' }
  ];

  constructor(private readonly api: ApiService, private route: Router) { }

  ngOnInit(): void { 

    this.api.getContas('').subscribe((data) => {
      this.contas = data;
    });

    this.getOrcamentos();
  }

  getSaldoParcial(): number {
    let saldo = 0;
    this.contas.forEach(c => {
      saldo = saldo + c.saldoParcial;
    })
    return saldo;
  }

  getCircumference(): number {
    return 2 * Math.PI * 44;
  }

  getDashOffset(index: number): number {
    const circumference = this.getCircumference();
    const total = this.orderStatuses.reduce((acc, curr) => acc + curr.count, 0);
    const offset = this.orderStatuses
      .slice(0, index)
      .reduce((acc, curr) => acc + (curr.count / total) * circumference, 0);
    return circumference - (this.orderStatuses[index].count / total) * circumference - offset;
  }

  getOrcamentos(){

    const date = new Date();  // 2009-11-10
    const month = date.toLocaleString('en-US', { month: 'long' });
    const data = {
      mes: month
    }

    this.api.getOrcamentos(data).subscribe((data) => {
      this.orcamentos = data;
    });
  }

  getMonth(): string {
    const now = new Date();
    let mes = now.toLocaleString('pt-Br', { month: 'long' });
    mes = mes.charAt(0).toUpperCase() + mes.slice(1);
    return mes;
  }

  simular() {
    this.route.navigate(["/simular"])
  }
}