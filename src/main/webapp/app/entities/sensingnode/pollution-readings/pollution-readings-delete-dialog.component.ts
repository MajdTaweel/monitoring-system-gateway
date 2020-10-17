import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPollutionReadings } from 'app/shared/model/sensingnode/pollution-readings.model';
import { PollutionReadingsService } from './pollution-readings.service';

@Component({
  templateUrl: './pollution-readings-delete-dialog.component.html',
})
export class PollutionReadingsDeleteDialogComponent {
  pollutionReadings?: IPollutionReadings;

  constructor(
    protected pollutionReadingsService: PollutionReadingsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pollutionReadingsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pollutionReadingsListModification');
      this.activeModal.close();
    });
  }
}
