import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPollutionReadings } from 'app/shared/model/sensingnode/pollution-readings.model';
import { PollutionReadingsService } from './pollution-readings.service';
import { PollutionReadingsDeleteDialogComponent } from './pollution-readings-delete-dialog.component';

@Component({
  selector: 'jhi-pollution-readings',
  templateUrl: './pollution-readings.component.html',
})
export class PollutionReadingsComponent implements OnInit, OnDestroy {
  pollutionReadings?: IPollutionReadings[];
  eventSubscriber?: Subscription;

  constructor(
    protected pollutionReadingsService: PollutionReadingsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.pollutionReadingsService.query().subscribe((res: HttpResponse<IPollutionReadings[]>) => (this.pollutionReadings = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPollutionReadings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPollutionReadings): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPollutionReadings(): void {
    this.eventSubscriber = this.eventManager.subscribe('pollutionReadingsListModification', () => this.loadAll());
  }

  delete(pollutionReadings: IPollutionReadings): void {
    const modalRef = this.modalService.open(PollutionReadingsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pollutionReadings = pollutionReadings;
  }
}
