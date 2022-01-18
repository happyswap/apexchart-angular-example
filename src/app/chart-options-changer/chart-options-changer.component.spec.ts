import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOptionsChangerComponent } from './chart-options-changer.component';

describe('ChartOptionsChangerComponent', () => {
  let component: ChartOptionsChangerComponent;
  let fixture: ComponentFixture<ChartOptionsChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartOptionsChangerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartOptionsChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
