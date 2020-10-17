import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MagnetometerReadingsUpdateComponent } from 'app/entities/sensingnode/magnetometer-readings/magnetometer-readings-update.component';
import { MagnetometerReadingsService } from 'app/entities/sensingnode/magnetometer-readings/magnetometer-readings.service';
import { MagnetometerReadings } from 'app/shared/model/sensingnode/magnetometer-readings.model';

describe('Component Tests', () => {
  describe('MagnetometerReadings Management Update Component', () => {
    let comp: MagnetometerReadingsUpdateComponent;
    let fixture: ComponentFixture<MagnetometerReadingsUpdateComponent>;
    let service: MagnetometerReadingsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MagnetometerReadingsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MagnetometerReadingsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MagnetometerReadingsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MagnetometerReadingsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MagnetometerReadings(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MagnetometerReadings();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
