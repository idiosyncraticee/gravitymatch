import { TestBed } from '@angular/core/testing';

import { SentimentAnalysisService } from './sentiment-analysis.service';

describe('SentimentAnalysisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SentimentAnalysisService = TestBed.get(SentimentAnalysisService);
    expect(service).toBeTruthy();
  });
});
