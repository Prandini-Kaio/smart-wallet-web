import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ContaFilter, ContaOutput } from '../../shared/conta/conta.model';
import { LancamentoOutput } from '../../shared/lancamento/model/lancamento.model';
import { parse } from 'date-fns';
import { LancamentoServiceService } from './service/lancamento-service.service';
import { Subscription } from 'rxjs';
import { FormLancamentoComponent } from "../lancamento-list/components/form-lancamento/form-lancamento.component";

@Component({
  selector: 'app-add-lancamento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormLancamentoComponent],
  templateUrl: './add-lancamento.component.html',
  styleUrl: './add-lancamento.component.scss'
})
export class AddLancamentoComponent {
 
  constructor(
    private api: ApiService,
    private _route: Router,
    private toastr: ToastrService,
    private lancamentoService: LancamentoServiceService
  ) { }


}