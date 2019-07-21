import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkgroupPlansListComponent } from './workgroup-plans-list.component';

describe('WorkgroupPlansListComponent', () => {
  let component: WorkgroupPlansListComponent;
  let fixture: ComponentFixture<WorkgroupPlansListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkgroupPlansListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkgroupPlansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
