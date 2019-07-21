import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupPlansComponent } from './workgroup-plans.component';

describe('WorkgroupPlansComponent', () => {
  let component: WorkgroupPlansComponent;
  let fixture: ComponentFixture<WorkgroupPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkgroupPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkgroupPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
