import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuriesPage } from './quries.page';

describe('QuriesPage', () => {
  let component: QuriesPage;
  let fixture: ComponentFixture<QuriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
