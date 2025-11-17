import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioPaese } from './dettaglio-paese';

describe('DettaglioPaese', () => {
  let component: DettaglioPaese;
  let fixture: ComponentFixture<DettaglioPaese>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettaglioPaese]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DettaglioPaese);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
