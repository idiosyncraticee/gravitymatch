import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakerProfilePage } from './matchmaker-profile.page';

describe('MatchmakerProfilePage', () => {
  let component: MatchmakerProfilePage;
  let fixture: ComponentFixture<MatchmakerProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchmakerProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchmakerProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
