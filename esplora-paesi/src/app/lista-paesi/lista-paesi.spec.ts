import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPaesi } from './lista-paesi';

describe('ListaPaesi', () => {
  let component: ListaPaesi;
  let fixture: ComponentFixture<ListaPaesi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPaesi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPaesi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
