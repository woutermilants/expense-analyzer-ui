import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringPaymentDetailComponent } from './recurring-payment-detail.component';

describe('RecurringPaymentDetailComponent', () => {
  let component: RecurringPaymentDetailComponent;
  let fixture: ComponentFixture<RecurringPaymentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurringPaymentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringPaymentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
