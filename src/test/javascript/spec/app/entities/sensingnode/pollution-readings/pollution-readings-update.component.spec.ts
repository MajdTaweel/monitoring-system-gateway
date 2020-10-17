import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PollutionReadingsUpdateComponent } from 'app/entities/sensingnode/pollution-readings/pollution-readings-update.component';
import { PollutionReadingsService } from 'app/entities/sensingnode/pollution-readings/pollution-readings.service';
import { PollutionReadings } from 'app/shared/model/sensingnode/pollution-readings.model';

describe('Component Tests', () => {
  describe('PollutionReadings Management Update Component', () => {
    let comp: PollutionReadingsUpdateComponent;
    let fixture: ComponentFixture<PollutionReadingsUpdateComponent>;
    let service: PollutionReadingsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PollutionReadingsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PollutionReadingsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PollutionReadingsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PollutionReadingsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PollutionReadings(123);
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
        const entity = new PollutionReadings();
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
