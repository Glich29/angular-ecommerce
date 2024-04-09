import { TestBed } from '@angular/core/testing';

import { EcommerceFormService } from './ecommerce-form.service';

describe('EcommerceFormService', () => {
  let service: EcommerceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcommerceFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
