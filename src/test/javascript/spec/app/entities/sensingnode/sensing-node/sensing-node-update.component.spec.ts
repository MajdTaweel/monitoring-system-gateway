import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SensingNodeUpdateComponent } from 'app/entities/sensingnode/sensing-node/sensing-node-update.component';
import { SensingNodeService } from 'app/entities/sensingnode/sensing-node/sensing-node.service';
import { SensingNode } from 'app/shared/model/sensingnode/sensing-node.model';

describe('Component Tests', () => {
  describe('SensingNode Management Update Component', () => {
    let comp: SensingNodeUpdateComponent;
    let fixture: ComponentFixture<SensingNodeUpdateComponent>;
    let service: SensingNodeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SensingNodeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SensingNodeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SensingNodeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SensingNodeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SensingNode(123);
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
        const entity = new SensingNode();
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
