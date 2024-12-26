import { NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { HttpParams } from "@angular/common/http";
import { GastosChartComponent } from "../gastos-chart/gastos-chart.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GastosChartComponent],
  template: `
    <app-gastos-chart/>
  `
})
export class HomeComponent implements OnInit{
  data: any;

  constructor(private apiContext: ApiService) { }

  ngOnInit(): void {

    const params = new HttpParams()
    .set('id', '1')

    this.apiContext.getLancamento(params).subscribe(response => {
      this.data = response;
    })
  }
}