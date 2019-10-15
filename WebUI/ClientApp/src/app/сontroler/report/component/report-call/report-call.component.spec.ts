import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCallComponent } from './report-call.component';

describe('ReportCallComponent', () => {
  let component: ReportCallComponent;
  let fixture: ComponentFixture<ReportCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
