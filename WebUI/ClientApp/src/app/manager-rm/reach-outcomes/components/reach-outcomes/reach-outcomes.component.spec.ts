import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReachOutcomesComponent } from './reach-outcomes.component';


describe('CompanyBirthdayComponent', () => {
  let component: ReachOutcomesComponent;
  let fixture: ComponentFixture<ReachOutcomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReachOutcomesComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReachOutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
