import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupsCallsListComponent } from './workgroups-calls-list.component';

describe('WorkgroupsCallsListComponent', () => {
  let component: WorkgroupsCallsListComponent;
  let fixture: ComponentFixture<WorkgroupsCallsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkgroupsCallsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkgroupsCallsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
