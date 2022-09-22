import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BkwiComponentComponent } from './bkwi-component.component';

describe('BkwiComponentComponent', () => {
  let component: BkwiComponentComponent;
  let fixture: ComponentFixture<BkwiComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BkwiComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BkwiComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
