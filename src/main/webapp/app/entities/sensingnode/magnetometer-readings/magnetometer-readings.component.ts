import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMagnetometerReadings } from 'app/shared/model/sensingnode/magnetometer-readings.model';
import { MagnetometerReadingsService } from './magnetometer-readings.service';
import { MagnetometerReadingsDeleteDialogComponent } from './magnetometer-readings-delete-dialog.component';

@Component({
  selector: 'jhi-magnetometer-readings',
  templateUrl: './magnetometer-readings.component.html',
})
export class MagnetometerReadingsComponent implements OnInit, OnDestroy {
  magnetometerReadings?: IMagnetometerReadings[];
  eventSubscriber?: Subscription;

  constructor(
    protected magnetometerReadingsService: MagnetometerReadingsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.magnetometerReadingsService
      .query()
      .subscribe((res: HttpResponse<IMagnetometerReadings[]>) => (this.magnetometerReadings = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMagnetometerReadings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMagnetometerReadings): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMagnetometerReadings(): void {
    this.eventSubscriber = this.eventManager.subscribe('magnetometerReadingsListModification', () => this.loadAll());
  }

  delete(magnetometerReadings: IMagnetometerReadings): void {
    const modalRef = this.modalService.open(MagnetometerReadingsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.magnetometerReadings = magnetometerReadings;
  }
}
