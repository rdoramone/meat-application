import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        LoginService
      ]
    })
  });

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);

    expect(service).toBeTruthy();
  });
});
