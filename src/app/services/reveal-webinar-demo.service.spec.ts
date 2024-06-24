import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RevealWebinarDemoService } from './reveal-webinar-demo.service';

describe('RevealWebinarDemoService', () => {
  let service: RevealWebinarDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RevealWebinarDemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
