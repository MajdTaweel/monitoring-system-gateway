import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MagnetometerReadingsDetailComponent } from 'app/entities/sensingnode/magnetometer-readings/magnetometer-readings-detail.component';
import { MagnetometerReadings } from 'app/shared/model/sensingnode/magnetometer-readings.model';

describe('Component Tests', () => {
  describe('MagnetometerReadings Management Detail Component', () => {
    let comp: MagnetometerReadingsDetailComponent;
    let fixture: ComponentFixture<MagnetometerReadingsDetailComponent>;
    const route = ({ data: of({ magnetometerReadings: new MagnetometerReadings(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MagnetometerReadingsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MagnetometerReadingsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MagnetometerReadingsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load magnetometerReadings on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.magnetometerReadings).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
