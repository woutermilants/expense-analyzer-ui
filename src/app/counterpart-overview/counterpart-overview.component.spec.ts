import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterpartOverviewComponent } from './counterpart-overview.component';

describe('ListCounterpartsComponent', () => {
  let component: CounterpartOverviewComponent;
  let fixture: ComponentFixture<CounterpartOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterpartOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterpartOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
