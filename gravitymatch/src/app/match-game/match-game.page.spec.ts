import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchGamePage } from './match-game.page';

describe('MatchGamePage', () => {
  let component: MatchGamePage;
  let fixture: ComponentFixture<MatchGamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchGamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
