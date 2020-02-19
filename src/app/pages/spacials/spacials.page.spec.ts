import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpacialsPage } from './spacials.page';

describe('SpacialsPage', () => {
  let component: SpacialsPage;
  let fixture: ComponentFixture<SpacialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacialsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpacialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
