import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { MagnetometerReadingsComponent } from 'app/entities/sensingnode/magnetometer-readings/magnetometer-readings.component';
import { MagnetometerReadingsService } from 'app/entities/sensingnode/magnetometer-readings/magnetometer-readings.service';
import { MagnetometerReadings } from 'app/shared/model/sensingnode/magnetometer-readings.model';

describe('Component Tests', () => {
  describe('MagnetometerReadings Management Component', () => {
    let comp: MagnetometerReadingsComponent;
    let fixture: ComponentFixture<MagnetometerReadingsComponent>;
    let service: MagnetometerReadingsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MagnetometerReadingsComponent],
      })
        .overrideTemplate(MagnetometerReadingsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MagnetometerReadingsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MagnetometerReadingsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MagnetometerReadings(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.magnetometerReadings && comp.magnetometerReadings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
