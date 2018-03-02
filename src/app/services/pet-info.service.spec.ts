import { TestBed, inject } from '@angular/core/testing';

import { PetInfoService } from './pet-info.service';

describe('PetInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetInfoService]
    });
  });

  it('should be created', inject([PetInfoService], (service: PetInfoService) => {
    expect(service).toBeTruthy();
  }));
});
