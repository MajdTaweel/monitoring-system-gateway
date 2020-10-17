import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMagnetometerReadings } from 'app/shared/model/sensingnode/magnetometer-readings.model';
import { MagnetometerReadingsService } from './magnetometer-readings.service';

@Component({
  templateUrl: './magnetometer-readings-delete-dialog.component.html',
})
export class MagnetometerReadingsDeleteDialogComponent {
  magnetometerReadings?: IMagnetometerReadings;

  constructor(
    protected magnetometerReadingsService: MagnetometerReadingsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.magnetometerReadingsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('magnetometerReadingsListModification');
      this.activeModal.close();
    });
  }
}
