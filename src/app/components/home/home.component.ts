import { NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <h1>Pagina inicial</h1>
    <div *ngIf="data">
      {{ data }}
    </div>
  `
})
export class HomeComponent implements OnInit{
  data: any;

  constructor(private apiContext: ApiService) { }

  ngOnInit(): void {

    const params = new HttpParams()
    .set('id', '1')

    this.apiContext.getLancamento(params).subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }
}