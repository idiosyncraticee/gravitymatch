import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptMatchmakingPage } from './prompt-matchmaking.page';

describe('PromptMatchmakingPage', () => {
  let component: PromptMatchmakingPage;
  let fixture: ComponentFixture<PromptMatchmakingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromptMatchmakingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptMatchmakingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
