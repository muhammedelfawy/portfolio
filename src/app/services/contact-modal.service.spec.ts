import { TestBed } from '@angular/core/testing';

import { ContactModalService } from './contact-modal.service';

describe('ContactModalService', () => {
  let service: ContactModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
