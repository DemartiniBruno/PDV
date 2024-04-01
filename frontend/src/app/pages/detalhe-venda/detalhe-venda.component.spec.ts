import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheVendaComponent } from './detalhe-venda.component';

describe('DetalheVendaComponent', () => {
  let component: DetalheVendaComponent;
  let fixture: ComponentFixture<DetalheVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalheVendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalheVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
