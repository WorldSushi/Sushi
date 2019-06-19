import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsDatesDialogComponent } from './calls-dates-dialog.component';

describe('CallsDatesDialogComponent', () => {
  let component: CallsDatesDialogComponent;
  let fixture: ComponentFixture<CallsDatesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallsDatesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsDatesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
