import { CommonModule, NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { HttpParams } from "@angular/common/http";
import { GastosChartComponent } from "../gastos-chart/gastos-chart.component";

interface OrderStatus {
  status: string;
  count: number;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GastosChartComponent,
    CommonModule
  ],
  styleUrl: 'home.component.scss',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit{
  totalRevenue = 10080;
  storeRevenue = 3236;
  onlineStoreRevenue = 3764;
  debtCollection = 1800;
  otherAmounts = 1200;
  totalOrders = 86;

  orderStatuses: OrderStatus[] = [
    { status: 'Success', count: 24, color: '#10B981' },
    { status: 'Waiting', count: 32, color: '#8B5CF6' },
    { status: 'Cancel', count: 16, color: '#EF4444' },
    { status: 'Processing', count: 14, color: '#3B82F6' }
  ];

  constructor() { }

  ngOnInit(): void { }

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
}