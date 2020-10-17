import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { MagnetometerReadingsDeleteDialogComponent } from 'app/entities/sensingnode/magnetometer-readings/magnetometer-readings-delete-dialog.component';
import { MagnetometerReadingsService } from 'app/entities/sensingnode/magnetometer-readings/magnetometer-readings.service';

describe('Component Tests', () => {
  describe('MagnetometerReadings Management Delete Component', () => {
    let comp: MagnetometerReadingsDeleteDialogComponent;
    let fixture: ComponentFixture<MagnetometerReadingsDeleteDialogComponent>;
    let service: MagnetometerReadingsService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MagnetometerReadingsDeleteDialogComponent],
      })
        .overrideTemplate(MagnetometerReadingsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MagnetometerReadingsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MagnetometerReadingsService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
