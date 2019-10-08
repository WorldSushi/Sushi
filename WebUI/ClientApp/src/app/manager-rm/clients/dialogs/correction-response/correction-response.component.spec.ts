import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionResponseComponent } from './correction-response.component';

describe('CorrectionResponseComponent', () => {
  let component: CorrectionResponseComponent;
  let fixture: ComponentFixture<CorrectionResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectionResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
