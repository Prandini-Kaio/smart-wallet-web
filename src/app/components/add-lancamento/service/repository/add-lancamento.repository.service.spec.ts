import { TestBed } from '@angular/core/testing';

import { AddLancamentoRepositoryService } from './add-lancamento.repository.service';

describe('AddLancamentoRepositoryService', () => {
  let service: AddLancamentoRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddLancamentoRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
